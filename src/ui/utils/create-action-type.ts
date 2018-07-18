const prefix = 'CST';

export const createActionType = (name: string, suffix?: string) => {
	const items = [prefix, name.toUpperCase()];
	if (suffix) {
		items.push(suffix.toUpperCase());
	}
	return items.join('_');
};

export const createApiTypes = (name: string) =>({
	requested: createActionType(name, 'requested'),
	completed: createActionType(name, 'completed'),
	failed: createActionType(name, 'failed'),
});
