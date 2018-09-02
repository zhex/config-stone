import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { observer, Provider } from 'mobx-react';
import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { SiteStore } from '../../stores';
import { AppHeader } from './AppHeader';
import { LoginPanel } from './LoginPanel';

export interface IAppProps {
	store: typeof SiteStore.Type;
	routes: RouteConfig[];
}

const s = { minHeight: '100vh' };

export const Application: React.SFC<IAppProps> = observer(
	({ store, routes }) => (
		<Provider store={store}>
			<BrowserRouter>
				<Layout style={s}>
					{store.session.user ? (
						<div>
							<AppHeader/>
							{renderRoutes(routes)}
						</div>
					) : (
						<LoginPanel/>
					)}
				</Layout>
			</BrowserRouter>
		</Provider>
	),
);

Application.displayName = 'Application';
