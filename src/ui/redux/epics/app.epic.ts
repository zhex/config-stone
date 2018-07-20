import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { actionTypes } from '../actions';

const apiPrefix = '/web/api/apps';

const getAppListEpic = action$ =>
	action$.pipe(
		ofType(actionTypes.getAppList.requested),
		mergeMap(() =>
			ajax(apiPrefix).pipe(
				map(data => ({
					type: actionTypes.getAppList.completed,
					payload: data.response,
				})),
				catchError(err =>
					of({
						type: actionTypes.getAppList.failed,
						payload: err.message,
					}),
				),
			),
		),
	);

const createAppEpic = action$ =>
	action$.pipe(
		ofType(actionTypes.createApp.requested),
		mergeMap(({ payload }) =>
			ajax({
				method: 'post',
				url: apiPrefix,
				body: payload,
			}).pipe(
				map(data => ({
					type: actionTypes.createApp.completed,
					payload: data.response,
				})),
				catchError(err =>
					of({
						type: actionTypes.createApp.failed,
						payload: err.message,
					}),
				),
			),
		),
	);

const updateAppEpic = action$ =>
	action$.pipe(
		ofType(actionTypes.updateApp.requested),
		mergeMap(({ payload }) =>
			ajax({
				method: 'put',
				url: apiPrefix + '/' + payload.id,
				body: payload.data,
			}).pipe(
				map(data => ({
					type: actionTypes.updateApp.completed,
					payload: data.response,
				})),
				catchError(err =>
					of({
						type: actionTypes.updateApp.failed,
						payload: err.message,
					}),
				),
			),
		),
	);

const deleteAppEpic = action$ =>
	action$.pipe(
		ofType(actionTypes.deleteApp.requested),
		mergeMap(({ payload }) =>
			ajax({
				method: 'delete',
				url: apiPrefix + '/' + payload,
			}).pipe(
				map(data => ({
					type: actionTypes.deleteApp.completed,
					payload: data.response,
				})),
				catchError(err =>
					of({
						type: actionTypes.deleteApp.failed,
						payload: err.message,
					}),
				),
			),
		),
	);

export default [getAppListEpic, createAppEpic, updateAppEpic, deleteAppEpic];
