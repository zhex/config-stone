import { get } from 'lodash';
import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';
import { api } from 'utils/api';
import { actions, actionTypes } from '../actions';

const apiPrefix = '/web/api/apps/:appId/profiles';

const fetchProfiles = action$ =>
	action$.pipe(
		ofType(actionTypes.profiles.fetchStart),
		filter(({ data }) => !get(data, 'id')),
		mergeMap(({ data }) =>
			api(apiPrefix.replace(':appId', data.appId)).pipe(
				map(result =>
					actions.profiles.fetchSuccess(result.response, {
						replace: true,
					}),
				),
				catchError(err => of(actions.profiles.fetchError(err))),
			),
		),
	);

const fetchProfile = action$ =>
	action$.pipe(
		ofType(actionTypes.profiles.fetchStart),
		filter(({ data }) => get(data, 'id')),
		mergeMap(({ data }) =>
			api(apiPrefix.replace(':appId', data.appId) + '/' + data.id).pipe(
				map(result => actions.profiles.fetchSuccess(result.response)),
				catchError(err => of(actions.profiles.fetchError(err))),
			),
		),
	);

const createProfile = action$ =>
	action$.pipe(
		ofType(actionTypes.profiles.createStart),
		mergeMap(({ data }) =>
			api({
				method: 'post',
				url: apiPrefix.replace(':appId', data.appId),
				body: data,
			}).pipe(
				map(result => actions.profiles.createSuccess(result.response)),
				catchError(err => of(actions.profiles.createError(err))),
			),
		),
	);

const updateProfile = action$ =>
	action$.pipe(
		ofType(actionTypes.profiles.updateStart),
		mergeMap(({ data }) =>
			api({
				method: 'put',
				url: apiPrefix.replace(':appId', data.appId) + '/' + data.id,
				body: data,
			}).pipe(
				map(() => actions.profiles.updateSuccess()),
				catchError(err => of(actions.profiles.updateError(err))),
			),
		),
	);

const deleteProfile = action$ =>
	action$.pipe(
		ofType(actionTypes.profiles.deleteStart),
		mergeMap(({ data }) =>
			api({
				method: 'delete',
				url: apiPrefix.replace(':appId', data.appId) + '/' + data.id,
			}).pipe(
				map(() => actions.profiles.deleteSuccess()),
				catchError(err => of(actions.profiles.deleteError(err))),
			),
		),
	);

export default [
	fetchProfiles,
	fetchProfile,
	createProfile,
	updateProfile,
	deleteProfile,
];
