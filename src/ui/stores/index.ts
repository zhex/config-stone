import { types } from 'mobx-state-tree';
import { AppStore } from './app';
import { ProfileStore } from './profile';

export const SiteStore = types.model({
	apps: types.optional(AppStore, { data: {} }),
	profiles: types.optional(ProfileStore, { data: {} }),
});

export const store = SiteStore.create();
(window as any).__store = store;
