import { get } from 'lodash';

export const appList = state => get(state, 'apps.data', []);
export const appLoading = state => get(state, 'apps.loading', false);
