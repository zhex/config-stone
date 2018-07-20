import { combineEpics } from 'redux-observable';
import appEpics from './app.epic';

export const rootEpic = combineEpics(
	...appEpics,
);
