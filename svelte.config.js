import adapter from './plugins/adapter-roll20-sheet.js';
import preprocess from 'svelte-preprocess';
import seqPreprocess from 'svelte-sequential-preprocessor';
import worker from './plugins/workerPreprocess.js';

const production = process.env.NODE_ENV == 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: seqPreprocess([preprocess(), ...worker()]),

	kit: {
		adapter: adapter({ pages: 'pages' }),
		prerender: {
			default: true
		},
		browser: {
			hydrate: !production
		},
		files: {
			template: production ? 'src/app_prod.html' : 'src/app_dev.html',
			routes: 'src/sheet'
		},
		routes: (path) => ['sheet.svelte', 'sheet.ts', 'sheet.js'].indexOf(path) !== -1
	}
};

export default config;
