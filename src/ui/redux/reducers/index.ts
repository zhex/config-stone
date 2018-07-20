import { combineReducers } from 'redux';
import { appsReducer as apps } from './app.reducer';
import { profilesReducer as profiles } from './profile.reducer';

export const rootReducer = combineReducers({
	apps,
	profiles,
});
