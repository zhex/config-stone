import { combineReducers } from 'redux';
import crud from 'redux-crud';
import { actionTypes } from '../actions';

function loading(state = false, { type }) {
	switch (type) {
		case actionTypes.apps.fetchStart:
			return true;
		case actionTypes.apps.fetchSuccess:
		case actionTypes.apps.fetchError:
			return false;
		default:
			return state;
	}
}

export const appsReducer = combineReducers({
	data: crud.List.reducersFor('apps'),
	loading,
});
