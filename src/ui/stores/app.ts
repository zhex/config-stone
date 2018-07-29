import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const App = types.model('App', {
	id: types.maybe(types.number),
	name: types.maybe(types.string),
	key: types.maybe(types.identifier),
});

export const AppStore = types
	.model('AppStore', {
		data: types.optional(types.map(App), {}),
		loading: false,
	})
	.views(self => ({
		get(key: string) {
			return self.data.get(key);
		},
		get list() {
			return values(self.data);
		}
	}))
	.actions(self => ({
		fetch: flow(function*() {
			self.loading = true;
			try {
				const apps = yield api.get('/apps').then(result => result.data);
				applySnapshot(self.data, array2map(apps, 'key'));
			} catch (err) {
				// self.error = err;
			}
			self.loading = false;
		}),

		fetchByKey: flow(function*(key: string) {
			self.loading = true;
			try {
				const app = yield api
					.get(`/apps/${key}`)
					.then(result => result.data);
				self.data.set(app.key, app);
			} catch (err) {
				// todo
			}
			self.loading = false;
		}),

		create: flow(function* (data) {
			yield api.post('/apps', data);
		})
	}));
