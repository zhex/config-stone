import { createActionType, createApiTypes } from 'utils/create-action-type';

export const actionTypes = {
	getAppList: createApiTypes('get_app_list'),
	createApp: createApiTypes('create_app'),
	updateApp: createApiTypes('update_app'),
	deleteApp: createApiTypes('delete_app'),

	profileList: createApiTypes('profile_list'),
	itemList: createApiTypes('item_list'),
};

export const appActions = {
	getAppList: () => ({
		type: actionTypes.getAppList.requested,
	}),
	createApp: (data) => ({
		type: actionTypes.createApp.requested,
		payload: data,
	}),
	updateApp: (id, data) => ({
		type: actionTypes.updateApp.requested,
		payload: { id, data },
	}),
	deleteApp: (id) => ({
		type: actionTypes.deleteApp.requested,
		payload: id,
	}),
};
