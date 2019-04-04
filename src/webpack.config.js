const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const sourcePath = join(__dirname, 'ui');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	mode: isDev ? 'development' : 'production',
	devtool: 'cheap-sourcemap',
	entry: {
		vendor: [
			'antd',
			'react',
			'react-dom',
			'react-router-config',
			'react-router-dom',
			'mobx',
			'mobx-react',
			'mobx-state-tree',
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
							transpileOnly: true,
						},
					},
				],
			},
			{
				test: /antd\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.css$/,
				exclude: [/antd\.css$/],
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
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
		new TSCheckerPlugin({
			tsconfig: join(sourcePath, 'tsconfig.json'),
			tslint: join(sourcePath, '../../tslint.json'),
		}),
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
