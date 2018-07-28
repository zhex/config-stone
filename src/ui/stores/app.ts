import { values } from 'mobx';
import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const App = types.model('App', {
	id: types.maybe(types.identifierNumber),
	name: types.maybe(types.string),
	key: types.maybe(types.string),
});

export const AppStore = types
	.model('AppStore', {
		data: types.optional(types.map(App), {}),
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
		fetch: flow(function*() {
			self.loading = true;
			try {
				const apps = yield api.get('/apps').then(result => result.data);
				applySnapshot(self.data, array2map(apps, 'id'));
			} catch (err) {
				// self.error = err;
			}
			self.loading = false;
		}),

		fetchById: flow(function*(id: number) {
			self.loading = true;
			try {
				const app = yield api
					.get(`/apps/${id}`)
					.then(result => result.data);
				self.data.set(app.id, app);
			} catch (err) {
				// todo
			}
			self.loading = false;
		}),

		create: flow(function* (data) {
			yield api.post('/apps', data);
		})
	}));
