import { actionTypes } from "../actions";

const initState = {
	loading: false,
	progressing: false,
	data: [],
	error: null,
	item: null,
};

export const appReducer = (state = initState, { type, payload }) => {
	switch(type) {
		case actionTypes.getAppList.requested:
			return { ...state, loading: true, error: null };
		case actionTypes.getAppList.completed:
			return { ...state, data: payload, loading: false };
		case actionTypes.getAppList.failed:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};
