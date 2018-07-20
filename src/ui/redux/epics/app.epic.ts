import { get } from 'lodash';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { actions, actionTypes } from '../actions';

const apiPrefix = '/web/api/apps';

const fetchApps = action$ =>
	action$.pipe(
		ofType(actionTypes.apps.fetchStart),
		filter(({ data }) => !get(data, 'id')),
		mergeMap(() =>
			ajax(apiPrefix).pipe(
				map(result =>
					actions.apps.fetchSuccess(result.response, {
						replace: true,
					}),
				),
				catchError(err => of(actions.apps.fetchError(err))),
			),
		),
	);

const fetchApp = action$ =>
	action$.pipe(
		ofType(actionTypes.apps.fetchStart),
		filter(({ data }) => get(data, 'id')),
		mergeMap(({ data }) =>
			ajax(apiPrefix + '/' + data.id).pipe(
				map(result => actions.apps.fetchSuccess(result.response)),
				catchError(err => of(actions.apps.fetchError(err))),
			),
		),
	);

const createApp = action$ =>
	action$.pipe(
		ofType(actionTypes.apps.createStart),
		mergeMap(({ data }) =>
			ajax({
				method: 'post',
				url: apiPrefix,
				body: data,
			}).pipe(
				map(result => actions.apps.createSuccess(result.response)),
				catchError(err => of(actions.apps.createError(err))),
			),
		),
	);

const updateApp = action$ =>
	action$.pipe(
		ofType(actionTypes.apps.updateStart),
		mergeMap(({ data }) =>
			ajax({
				method: 'put',
				url: apiPrefix + '/' + data.id,
				body: data,
			}).pipe(
				map(() => actions.apps.updateSuccess()),
				catchError(err => of(actions.apps.updateError(err))),
			),
		),
	);

const deleteApp = action$ =>
	action$.pipe(
		ofType(actionTypes.apps.deleteStart),
		mergeMap(({ data }) =>
			ajax({
				method: 'delete',
				url: apiPrefix + '/' + data.id,
			}).pipe(
				map(() => actions.apps.deleteSuccess()),
				catchError(err => of(actions.apps.deleteError(err))),
			),
		),
	);

export default [fetchApps, fetchApp, createApp, updateApp, deleteApp];
