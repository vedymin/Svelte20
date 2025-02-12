/**@type {import("webpack").Configuration} */
export default {
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.js', '.ts']
	},
	optimization: {
		minimize: false,
	},
};
