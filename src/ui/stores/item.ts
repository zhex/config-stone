import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const Item = types.model('Item', {
	id: types.maybe(types.identifierNumber),
	key: types.maybe(types.string),
	value: types.maybe(types.string),
	comment: types.union(types.string, types.null),
	order: types.maybe(types.number),
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
		},

		get nextOrder() {
			let n = 0;
			for (const item of values(self.data)) {
				if (item.order > n) {
					n = item.order;
				}
			}
			return n+1;
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

		create: flow(function* (appId: number, profileId: number, data) {
			data.order = self.nextOrder;
			yield api.post(`/apps/${appId}/profiles/${profileId}/items`, data);
		}),

		delete: flow(function* (appId: number, profileId: number, id: number) {
			yield api.delete(`/apps/${appId}/profiles/${profileId}/items/${id}`);
			self.data.delete(id.toString());
		}),
	}));
