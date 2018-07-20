import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';
import { rootReducer } from './reducers';

const composeEnhancers =
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

const middleware = applyMiddleware(epicMiddleware);

export const store = createStore(rootReducer, {}, composeEnhancers(middleware));

epicMiddleware.run(rootEpic);
