import { RouteConfig } from "react-router-config";

import * as appMod from 'modules/app/index';

export const routes: RouteConfig[] = [
	{ path: '/', exact: true, component: appMod.AppList },
	{ path: '/apps/:id', exact: true, component: appMod.AppDetail },
];
