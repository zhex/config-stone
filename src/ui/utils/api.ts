import { ajax, AjaxRequest } from 'rxjs/ajax';

export const api = (data: string | AjaxRequest) => {
	if (typeof data === 'string') {
		data = {
			url: data,
			headers: {
				Accept: 'application/json',
			},
		};
	} else {
		// tslint:disable-next-line:no-string-literal
		data.headers['Accept'] = 'application/json';
	}
	return ajax(data);
};
