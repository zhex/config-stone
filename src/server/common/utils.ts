import { includes, set } from 'lodash';

export function flat2nested(obj) {
	const data = {};
	Object.keys(obj).forEach(key => {
		set(data, key, obj[key]);
	});
	return data;
}

export function getExt(file: string): string {
	const idx = file.lastIndexOf('.');
	return idx > 0 ? file.substr(idx + 1) : null;
}

export function stripExt(file: string): string {
	const idx = file.lastIndexOf('.');
	return idx > 0 ? file.slice(0, idx) : file;
}
