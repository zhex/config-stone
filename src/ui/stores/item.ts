import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const Item = types.model('Item', {
	id: types.maybe(types.number),
	key: types.maybe(types.identifier),
	value: types.maybe(types.string),
	comment: types.union(types.string, types.null),
	order: types.maybe(types.number),
	appKey: types.maybe(types.string),
	profileKey: types.maybe(types.string),
});

export const ItemStore = types
	.model('ItemStore', {
		data: types.optional(types.map(Item), {}),
		loading: false,
	})
	.views(self => ({
		get(key: string) {
			return self.data.get(key);
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
			return n + 1;
		},
	}))
	.actions(self => ({
		fetch: flow(function*(appKey: string, profileKey: string) {
			self.loading = true;
			try {
				const items = yield api
					.get(`/apps/${appKey}/profiles/${profileKey}/items`)
					.then(result => result.data);
				applySnapshot(self.data, array2map(items, 'key'));
			} catch (err) {
				// self.error = err;
			}
			self.loading = false;
		}),

		fetchByKey: flow(function*(
			appKey: string,
			profileKey: string,
			key: string,
		) {
			self.loading = true;
			try {
				const item = yield api
					.get(`/apps/${appKey}/profiles/${profileKey}/items/${key}`)
					.then(result => result.data);
				self.data.set(item.key, item);
			} catch (err) {
				// todo
			}
			self.loading = false;
		}),

		create: flow(function*(appKey: string, profileKey: string, data) {
			data.order = self.nextOrder;
			yield api.post(
				`/apps/${appKey}/profiles/${profileKey}/items`,
				data,
			);
		}),

		update: flow(function*(
			appKey: string,
			profileKey: string,
			key: string,
			data,
		) {
			yield api.put(
				`/apps/${appKey}/profiles/${profileKey}/items/${key}`,
				data,
			);
			applySnapshot(self.get(key), data);
		}),

		delete: flow(function*(item: typeof Item.Type) {
			yield api.delete(
				`/apps/${item.appKey}/profiles/${item.profileKey}/items/${
					item.key
				}`,
			);
			self.data.delete(item.key);
		}),
	}));
