import pkg from 'webpack';
const { webpack } = pkg;
import { createFsFromVolume, Volume } from 'memfs';
import fs from 'fs';
import path from 'path';
import webpackConfig from '../webpack.config.js';

const production = process.env.NODE_ENV == 'production';

function createMemfsProxy() {
	return new Proxy(createFsFromVolume(new Volume()), {
		get(memfs, property) {
			function proxy(file, ...args) {
				if (memfs.existsSync(file)) return memfs[property](file, ...args);
				return fs[property](file, ...args);
			}
			const properties = {
				readFile: proxy,
				readFileSync: proxy,
				readlink: proxy,
				stat: proxy
			};
			return properties[property] ?? memfs[property];
		}
	});
}

/**@type {import("svelte-preprocess/dist/types").PreprocessorGroup} */
export default () => [
	{
		/**@type {import("svelte-preprocess/dist/types").Preprocessor} */
		async script(svelteFile) {
			const { filename, attributes, content } = svelteFile;
			if (!attributes['sheetworker']) return { code: content };
			if (!production) return { code: "" }

			const entry = filename + '.ts';

			const memfs = createMemfsProxy();

			memfs.mkdirSync(path.dirname(entry), { recursive: true });
			memfs.writeFileSync(entry, content);

			/**@type {import("webpack").Configuration} */
			const options = {
				entry,
				...webpackConfig
			};

			const compiler = webpack(options);
			compiler.inputFileSystem = memfs;
			compiler.outputFileSystem = memfs;

			await new Promise((resolve) => {
				compiler.run((err, stats) => {
					const error = err || stats.compilation.errors[0];
					if (error) {
						throw new Error(error);
					}
					resolve();
				});
			});

			const output = options.output ?? 'dist/main.js';
			let newCode = '';
			try {
				newCode = memfs.readFileSync(output).toString();
			} catch (e) {
				throw new Error('Webpack encountered an error');
			}

			const context = attributes['context'] ?? 'instance';
			workerCode[filename] = workerCode[filename] ?? {};
			workerCode[filename][context] = newCode;
			return { code: '' };
		}
	},
	{
		/**@type {import("svelte-preprocess/dist/types").MarkupPreprocessor} */
		markup(svelteFile) {
			const { filename, content } = svelteFile;

			const codeContexts = workerCode[filename];

			if (!codeContexts) return { code: content };

			let newCode = content;

			for (const context in codeContexts) {
				if (Object.hasOwnProperty.call(codeContexts, context)) {
					const code = codeContexts[context];
					newCode =
						`{#if true}<script type="text/worker">${code}</script>{/if}
                ` + newCode;
				}
			}

			delete workerCode[filename];

			return {
				code: newCode
			};
		}
	}
];

const workerCode = {};
