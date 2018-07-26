import { types } from 'mobx-state-tree';
import { AppStore } from './app';
import { ItemStore } from './item';
import { ProfileStore } from './profile';

export const SiteStore = types.model({
	apps: types.optional(AppStore, { data: {} }),
	profiles: types.optional(ProfileStore, { data: {} }),
	items: types.optional(ItemStore, { data: {} }),
});

export const store = SiteStore.create();
