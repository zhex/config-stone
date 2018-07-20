import { combineReducers } from 'redux';
import crud from 'redux-crud';
import { actionTypes } from '../actions';

function loading(state = false, { type }) {
	switch (type) {
		case actionTypes.profiles.fetchStart:
			return true;
		case actionTypes.profiles.fetchSuccess:
		case actionTypes.profiles.fetchError:
			return false;
		default:
			return state;
	}
}

export const profilesReducer = combineReducers({
	data: crud.List.reducersFor('profiles'),
	loading,
});
