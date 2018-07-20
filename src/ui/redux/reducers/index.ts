import { combineReducers } from 'redux';
import { appsReducer as apps } from './app.reducer';

export const rootReducer = combineReducers({
	apps,
});
