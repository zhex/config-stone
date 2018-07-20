import crud from 'redux-crud';

export const actionTypes = {
	apps: crud.actionTypesFor('apps'),
	profiles: crud.actionTypesFor('profiles'),
	items: crud.actionTypesFor('items'),
};

export const actions = {
	apps: crud.actionCreatorsFor('apps'),
	profiles: crud.actionCreatorsFor('profiles'),
	items: crud.actionCreatorsFor('items'),
};
