import { createActionType, createApiTypes } from "utils/create-action-type";

export const actionTypes = {
	appList: createApiTypes('app_list'),
	profileList: createApiTypes('profile_list'),
	itemList: createApiTypes('item_list'),
};

export const requestAppList = () => ({
	type: actionTypes.appList.requested,
});
