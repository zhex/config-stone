import { types } from 'mobx-state-tree';
import { AppStore } from './app';
import { ItemStore } from './item';
import { ProfileStore } from './profile';
import { SessionStore } from './session';

export const SiteStore = types.model({
	apps: types.optional(AppStore, { data: {} }),
	profiles: types.optional(ProfileStore, { data: {} }),
	items: types.optional(ItemStore, { data: {} }),
	session: types.optional(SessionStore, {}),
});

export const store = SiteStore.create();
