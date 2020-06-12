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
	GET_USER_FAILED,
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
			return { ...state, error: null };

		case LOGIN_SUCCESS:
			return {
				user         : action.payload,
				userLoggedIn : true,
				error        : null
			};
		case SAVE_LOGGED_IN_USER:
			return {
				token        : action.payload,
				userLoggedIn : true,
				error        : null
			};
		case LOGIN_FAILED:
			return {
				userLoggedIn : false,
				error        : action.payload
			};
		case GET_USER:
			return { userLoggedIn: true, user: action.payload, error: null };

		case GET_USER_SUCCESS:
			return { userLoggedIn: true, token: action.payload, error: null };

		case GET_USER_FAILED:
			return { userLoggedIn: false, error: action.payload };
		case LOGOUT:
			return {
				...state
			};
		default:
			return state;
	}
};

/* export default (state = initialState, action) => {
	switch (action.type) {
	  case 'SAVE_USER':
		if (action.user.sessionId) {
		  AsyncStorage.setItem('sessionId', action.user.sessionId);
		}
		if (action.user.id) {
		  AsyncStorage.setItem('userId', action.user.id);
		}
		return {
		  ...state,
		  id: action.user.id || state.id,
		  sessionId: action.user.sessionId || state.sessionId,
		  username: action.user.username || state.username,
		  password: action.user.password || state.password
		});
	  default:
		return state;
	}
  }; */
