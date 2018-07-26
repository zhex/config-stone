import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const Item = types.model('Item', {
	id: types.maybe(types.identifierNumber),
	key: types.maybe(types.string),
	value: types.maybe(types.string),
	profileId: types.maybe(types.number),
});

export const ItemStore = types
	.model('ItemStore', {
		data: types.optional(types.map(Item), {}),
		loading: false,
	})
	.views(self => ({
		get(id: number) {
			return self.data.get(id + '');
		},
		get list() {
			return values(self.data);
		}
	}))
	.actions(self => ({
		fetch: flow(function*(appId: number, profileId: number) {
			self.loading = true;
			try {
				const items = yield api
					.get(`/apps/${appId}/profiles/${profileId}/items`)
					.then(result => result.data);
				applySnapshot(self.data, array2map(items, 'id'));
			} catch (err) {
				// self.error = err;
			}
			self.loading = false;
		}),

		fetchById: flow(function*(appId: number, profileId: number, id: number) {
			self.loading = true;
			try {
				const item = yield api
					.get(`/apps/${appId}/profiles/${profileId}/items/${id}`)
					.then(result => result.data);
				self.data.set(item.id, item);
			} catch (err) {
				// todo
			}
			self.loading = false;
		}),
	}));
