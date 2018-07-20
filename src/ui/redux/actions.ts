import crud from 'redux-crud';

export const actionTypes = {
	apps: crud.actionTypesFor('apps'),
};

export const actions = {
	apps: crud.actionCreatorsFor('apps'),
};
