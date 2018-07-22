import { RouteConfig } from "react-router-config";

import * as app from 'modules/app';

export const routes: RouteConfig[] = [
	{ path: '/', exact: true, component: app.AppList },
	{ path: '/apps/:id', exact: true, component: app.AppDetail },
];
