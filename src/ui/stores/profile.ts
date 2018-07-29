import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const Profile = types.model('Profile', {
	id: types.maybe(types.number),
	name: types.maybe(types.string),
	key: types.maybe(types.identifier),
	appKey: types.maybe(types.string),
});

export const ProfileStore = types
	.model('ProfileStore', {
		data: types.optional(types.map(Profile), {}),
		loading: false,
	})
	.views(self => ({
		get(key: string) {
			return self.data.get(key);
		},
		get list() {
			return values(self.data);
		},
		get first(): typeof Profile.Type {
			return values(self.data)[0];
		},
	}))
	.actions(self => ({
		fetch: flow(function*(appKey: string) {
			self.loading = true;
			try {
				const profiles = yield api
					.get(`/apps/${appKey}/profiles`)
					.then(result => result.data);
				applySnapshot(self.data, array2map(profiles, 'key'));
			} catch (err) {
				// self.error = err;
			}
			self.loading = false;
		}),

		fetchByKey: flow(function*(appKey: string, key: string) {
			self.loading = true;
			try {
				const profile = yield api
					.get(`/apps/${appKey}/profiles/${key}`)
					.then(result => result.data);
				self.data.set(profile.key, profile);
			} catch (err) {
				// todo
			}
			self.loading = false;
		}),

		create: flow(function*(appKey: string, data) {
			yield api.post(`/apps/${appKey}/profiles`, data);
		}),

		release(profile: typeof Profile.Type) {
			return api.post(
				`/apps/${profile.appKey}/profiles/${profile.key}/release`,
			);
		},
	}));
