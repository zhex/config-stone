import { request } from "https";

const prefix = 'CST/';

export const createActionType = (name: string, suffix?: string) => {
	const items = [name.toUpperCase()];
	if (suffix) {
		items.push(suffix.toUpperCase());
	}
	return prefix + items.join('_');
};

export const createApiTypes = (name: string) => ({
	requested: createActionType(name, 'requested'),
	completed: createActionType(name, 'completed'),
	failed: createActionType(name, 'failed'),
});
