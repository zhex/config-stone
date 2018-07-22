import { applySnapshot, flow, types } from 'mobx-state-tree';
import { api } from 'utils/api';
import { array2map } from 'utils/helper';

export const App = types.model('App', {
	id: types.maybe(types.identifierNumber),
	name: types.string,
	key: types.string,
});

export const AppStore = types
	.model('AppStore', {
		data: types.optional(types.map(App), {}),
		loading: false,
	})
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

		get(id: number) {
			return self.data.get(String(id));
		}
	}));
