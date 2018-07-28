import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const Profile = types.model('Profile', {
	id: types.maybe(types.identifierNumber),
	name: types.maybe(types.string),
	key: types.maybe(types.string),
	appId: types.maybe(types.number),
});

export const ProfileStore = types
	.model('ProfileStore', {
		data: types.optional(types.map(Profile), {}),
		loading: false,
	})
	.views(self => ({
		get(id: number) {
			return self.data.get(id + '');
		},
		get list() {
			return values(self.data);
		},
		get first(): typeof Profile.Type {
			return values(self.data)[0];
		}
	}))
	.actions(self => ({
		fetch: flow(function*(appId: number) {
			self.loading = true;
			try {
				const profiles = yield api
					.get(`/apps/${appId}/profiles`)
					.then(result => result.data);
				applySnapshot(self.data, array2map(profiles, 'id'));
			} catch (err) {
				// self.error = err;
			}
			self.loading = false;
		}),

		fetchById: flow(function*(appId: number, id: number) {
			self.loading = true;
			try {
				const profile = yield api
					.get(`/apps/${appId}/profiles/${id}`)
					.then(result => result.data);
				self.data.set(profile.id, profile);
			} catch (err) {
				// todo
			}
			self.loading = false;
		}),

		create: flow(function* (appId: number, data) {
			yield api.post(`/apps/${appId}/profiles`, data);
		})
	}));
