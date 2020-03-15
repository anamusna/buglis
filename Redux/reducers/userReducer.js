import {
	CREATE_USER,
	CREATE_USER_SUCCESS,
	LOGIN,
	LOGOUT,
	SET_USERNAME,
	SET_PASSWORD,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	GET_ALL_USERS
} from '../actions/types';

const initialState = {
	user : {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				user         : action.payload,
				userSignedUp : true,
				error        : null
			};
		case LOGIN:
			return {
				user         : action.payload,
				userLoggedIn : true,
				error        : null
			};
		case LOGOUT:
			return {
				...state,
				user : {}
			};
		default:
			return state;
	}
};
