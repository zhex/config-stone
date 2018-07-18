const initState = {
	loading: false,
	progressing: false,
	data: [],
	error: null,
	item: null,
};

export const appReducer = (state = initState, { type, payload }) => {
	return state;
};
