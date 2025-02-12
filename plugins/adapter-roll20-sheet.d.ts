export interface Options extends AdapterOptions {
	author?: string;
	sheetName?: string;
	mainHtmlFile?: string;
	adapterStaticOptions?: import('@sveltejs/adapter-static').AdapterOptions;
}

export default (options: Options) => unknown;
