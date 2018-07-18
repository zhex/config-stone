import { Layout } from 'antd';
import 'antd/dist/antd.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import { AppHeader } from './AppHeader';

export interface IAppProps {
	store: Store;
	routes: RouteConfig[];
}

export const Application: React.SFC<IAppProps> = ({ store, routes }) => (
	<Provider store={store}>
		<BrowserRouter>
			<Layout style={{minHeight: '100vh'}}>
				<AppHeader />
				{ renderRoutes(routes) }
			</Layout>
		</BrowserRouter>
	</Provider>
);

Application.displayName = 'Application';
