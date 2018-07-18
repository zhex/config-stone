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
		case actionTypes.appList.requested:
			return { ...state, loading: true };
		case actionTypes.appList.completed:
			return { ...state, data: payload, loading: false };
		default:
			return state;
	}
};
