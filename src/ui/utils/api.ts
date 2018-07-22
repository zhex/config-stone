import axios from 'axios';

export const api = axios.create({
	baseURL: '/web/api',
	headers: {
		'Accept': 'application/json',
	}
});
