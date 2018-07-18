const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const sourcePath = join(__dirname, 'src/ui');

module.exports = {
	mode: 'development',
	devtool: 'cheap-sourcemap',
	entry: {
		vendor: ['react', 'react-dom', 'redux', 'react-redux'],
		main: [
			join(sourcePath, 'main.tsx'),
			'webpack-hot-middleware/client',
		],
	},
	output: {
		path: join(__dirname, 'dist/ui'),
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: join(sourcePath, 'tsconfig.json'),
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		modules: ['node_modules', sourcePath],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: 'vendor',
					enforce: true,
				},
			},
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Config Stone',
			hash: true,
			inject: true,
			filename: 'index.html',
			template: join(sourcePath, 'index.tpl.html'),
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	node: {
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	},
};
