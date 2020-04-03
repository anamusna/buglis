import {
	CREATE_USER,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	LOGIN,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT,
	GET_ALL_USERS,
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,
	SET_USERNAME,
	SET_PASSWORD,
	SAVE_LOGGED_IN_USER
} from '../actions/types';

const initialState = {
	user         : {},
	token        : '',
	error        : null,
	userLoggedIn : false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				user : action.payload
			};

		case CREATE_USER_SUCCESS:
			return {
				user         : action.payload,
				userSignedUp : true,
				error        : null
			};

		case CREATE_USER_FAILED:
			return {
				user         : {},
				userSignedUp : false,
				error        : action.payload
			};

		case LOGIN:
			return {
				...state,
				user         : action.payload,
				userLoggedIn : true,
				error        : null
			};

		case LOGIN_SUCCESS:
			return {
				...state,
				user         : action.payload,
				userLoggedIn : true,
				error        : null
			};
		case LOGIN_FAILED:
			return {
				...state,
				userLoggedIn : false,
				error        : action.payload
			};
		case GET_USER:
			return { ...state, error: null };

		case GET_USER_SUCCESS:
			return { ...state, userLoggedIn: true, user: action.payload, error: null };

		case GET_USER_FAILURE:
			return { ...state, userLoggedIn: false, error: action.payload };
		case LOGOUT:
			return {
				...state,
				user : {}
			};
		default:
			return state;
	}
};
