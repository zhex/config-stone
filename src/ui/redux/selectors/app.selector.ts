import { get } from 'lodash';

export const appList = state => get(state, 'apps.data', []);
export const getApp = (state, id) => appList(state).find(app => app.id === id);
export const appLoading = state => get(state, 'apps.loading', false);
