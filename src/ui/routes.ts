import { RouteConfig } from 'react-router-config';

import * as app from 'modules/app';
import * as profile from 'modules/profile';

export const routes: RouteConfig[] = [
	{ path: '/', exact: true, component: app.AppList },
	{
		path: '/apps/:appId',
		component: app.AppDetail,
		routes: [
			{
				path: '/apps/:appId/profiles/:profileId',
				exact: true,
				component: profile.ProfileDetail,
			},
		],
	},
];
