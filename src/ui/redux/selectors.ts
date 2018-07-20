import { get } from 'lodash';

export const appList = state => get(state, 'apps.data', []);
export const getApp = (state, id) =>
	appList(state).find(app => app.id === Number(id));
export const appLoading = state => get(state, 'apps.loading', false);

export const profileList = state => get(state, 'profiles.data', []);
export const getProfile = (state, id) =>
	profileList(state).find(p => p.id === Number(id));
export const profileLoading = state => get(state, 'profiles.loading', false);
