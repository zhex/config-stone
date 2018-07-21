const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const sourcePath = join(__dirname, 'ui');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	mode: isDev ? 'development' : 'production',
	devtool: 'cheap-sourcemap',
	entry: {
		vendor: [
			'react',
			'react-dom',
			'redux',
			'redux-observable',
			'react-redux',
			'react-router-config',
			'react-router-dom',
			'rxjs',
		],
		main: isDev
			? [join(sourcePath, 'main.tsx'), 'webpack-hot-middleware/client']
			: [join(sourcePath, 'main.tsx')],
	},
	output: {
		path: join(__dirname, '../dist/ui'),
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
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
				]
			},
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'style-loader'
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
		new MiniCssExtractPlugin({
			filename: isDev ? '[name].css' : '[name].[hash].css',
			chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
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
