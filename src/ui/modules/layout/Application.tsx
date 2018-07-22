import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { AppHeader } from './AppHeader';

export interface IAppProps {
	store: any;
	routes: RouteConfig[];
}

const s = { minHeight: '100vh' };

export const Application: React.SFC<IAppProps> = observer(
	({ store, routes }) => (
		<Provider store={store}>
			<BrowserRouter>
				<Layout style={s}>
					<AppHeader />
					{renderRoutes(routes)}
				</Layout>
			</BrowserRouter>
		</Provider>
	),
);

Application.displayName = 'Application';
