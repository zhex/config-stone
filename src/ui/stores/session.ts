import { flow, types } from 'mobx-state-tree';
import { api } from '../utils/api';
import { User } from './user';

export const SessionStore = types
	.model('SessionStore', {
		user: types.maybe(User),
		loading: false,
	})
	.actions(self => ({
		login: flow(function*(email: string, password: string) {
			self.loading = true;
			try {
				self.user = yield api.post('/session/authorize', {
					email,
					password,
				});
			} catch (err) {
				// todo
				self.user = null;
			} finally {
				self.loading = false;
			}
		}),
	}));
