const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sourcePath = join(__dirname, 'src/ui');

module.exports = {
	mode: 'development',
	devtool: 'cheap-sourcemap',
	entry: {
		vendor: ['react', 'react-dom'],
		main: join(sourcePath, 'main.tsx'),
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
				loader: 'ts-loader',
				options: {
					configFile: join(sourcePath, 'tsconfig.json'),
				},
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
			hash: true,
			inject: true,
		}),
	],
};
