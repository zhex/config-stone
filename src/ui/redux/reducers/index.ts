import { combineReducers } from 'redux';
import { appReducer as apps } from './app.reducer';

export const rootReducer = combineReducers({
	apps,
});
