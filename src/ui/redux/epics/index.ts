import { combineEpics } from 'redux-observable';
import appEpics from './app.epic';
import profileEpics from './profile.epic';

export const rootEpic = combineEpics(
	...appEpics,
	...profileEpics,
);
