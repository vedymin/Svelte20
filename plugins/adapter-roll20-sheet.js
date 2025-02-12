import AdapterStatic from '@sveltejs/adapter-static';
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import prettier from 'prettier';

const adapterName = 'sveltekit-adapter-roll20-sheet';

export default (options) => ({
	name: adapterName,
	async adapt(builder) {
		const tempDir = path.join('.svelte-kit', adapterName);
		const name = options.sheetName ?? 'sheet';
		const outDir = options.outDir ?? 'build';
		const author = options.author ?? '';
		/** @type {string} */
		const index = options.mainHtmlFile ?? 'sheet.html';

		const adapterStatic = AdapterStatic({
			...options.adapterStaticOptions,
			pages: tempDir,
			assets: tempDir
		});

		await adapterStatic.adapt(builder);

		if (fs.existsSync(outDir)) fs.rmSync(outDir, { recursive: true, force: true });

		fs.mkdirSync(outDir);

		const files = glob.sync(path.join(tempDir, '*'));

		for (const file of files) {
			if (fs.lstatSync(file).isDirectory()) continue;
			const baseName = path.basename(file);
			if (['manifest.json', 'sheet.overrides.json', 'instructions.md'].indexOf(baseName) != -1)
				continue;
			fs.copyFileSync(file, path.join(outDir, baseName));
		}

		let instructions = '';
		try {
			instructions = fs.readFileSync(path.join(tempDir, 'instructions.md')).toString();
		} catch (e) {
			console.log(e);
		}

		let sheetOverrides = '{}';
		try {
			sheetOverrides = fs.readFileSync(path.join(tempDir, 'sheet.overrides.json')).toString();
			sheetOverrides = JSON.parse(sheetOverrides);
		} catch (e) {
			console.log(e);
		}

		const sheetJson = {
			html: `${name}.html`,
			css: `${name}.css`,
			authors: author,
			roll20userid: '1',
			preview: 'preview.png',
			instructions,
			legacy: false,
			...sheetOverrides
		};

		fs.writeFileSync(path.join(outDir, 'sheet.json'), JSON.stringify(sheetJson, undefined, 4));

		let indexHtml = fs.readFileSync(path.join(outDir, index)).toString();
		let cssPath = /<\s*link.*href="(.*\.css)".*>/g.exec(indexHtml)?.at(1);
		let indexSplit = indexHtml.split('<script type="module"');
		indexSplit[indexSplit.length - 1] = '';
		indexHtml = indexSplit.join('');
		indexSplit = indexHtml.split('<!-- svelte head end -->');
		indexSplit[0] = '';
		indexHtml = indexSplit.join('');
		indexHtml = prettier.format(indexHtml, { filepath: index });
		fs.writeFileSync(path.join(outDir, index), indexHtml);
		fs.renameSync(path.join(outDir, index), path.join(outDir, sheetJson.html));

		let css = '';
		try {
			css = fs.readFileSync(path.join(tempDir, cssPath)).toString();
		} catch (e) {
			console.log(e);
		}

		css = prettier.format(css, { filepath: cssPath });
		fs.writeFileSync(path.join(outDir, sheetJson.css), css);

		// const css = glob.sync(path.join(__dirname, "build/_app/immutable/assets/*.css"))
		// for (const file of css) {
		//     fs.copyFileSync(file, path.join(outDir, sheetJson.css))
		//     break
		// }
	}
});
