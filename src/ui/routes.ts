import { RouteConfig } from "react-router-config";

import * as app from 'modules/app';

export const routes: RouteConfig[] = [
	{ path: '/', exact: true, component: app.AppListContainer },
	{ path: '/apps/:id', exact: true, component: app.AppDetailContainer },
];
