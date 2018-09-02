import { types } from 'mobx-state-tree';

export const User = types.model('User', {
	id: types.maybe(types.number),
	email: types.maybe(types.string),
	name: types.maybe(types.string),
});
