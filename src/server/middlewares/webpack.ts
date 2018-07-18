import * as webpack from 'webpack';
import * as middleware from 'webpack-dev-middleware';
import * as hotMiddlware from 'webpack-hot-middleware';
import * as config from '../../../webpack.config';
const compiler = webpack(config);

export const webpackMiddleware = () =>
	middleware(compiler, { stats: 'errors-only' });

export const webpackHotMiddlware = () => hotMiddlware(compiler);
