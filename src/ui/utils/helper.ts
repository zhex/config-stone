export const array2map = (data: any[], keyName: string) =>
	data.reduce((collection, item) => {
		collection[item[keyName]] = item;
		return collection;
	}, {});
