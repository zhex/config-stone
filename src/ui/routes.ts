import { RouteConfig } from 'react-router-config';

import * as app from 'modules/app';
import * as profile from 'modules/profile';

export const routes: RouteConfig[] = [
	{ path: '/', exact: true, component: app.AppList },
	{
		path: '/apps/:appKey',
		component: app.AppDetail,
		routes: [
			{
				path: '/apps/:appKey/profiles/:profileKey',
				exact: true,
				component: profile.ProfileDetail,
			},
		],
	},
];
