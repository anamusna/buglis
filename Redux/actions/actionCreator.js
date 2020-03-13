import axios from 'axios';
import {
	GET_POSTS,
	CREATE_USER,
	SIGN_IN,
	SIGN_OUT,
	ADD_NEW_POST,
	SAVE_LOGGED_IN_USER,
	GET_ALL_USERS,
	ERROR
} from './actionTypes';

export const getAllUsers = () => (dispatch) => {
	axios.get('http://localhost:3001/api/users').then((response) => {
		dispatch({
			type    : GET_ALL_USERS,
			payload : response.data
		});
	});
};

export const getPosts = () => (dispatch) => {
	axios.get('http://192.168.178.21:3001/api/posts/list').then((response) => {
		dispatch({
			type    : GET_POSTS,
			payload : response.data
		});
	});
};

export const savePost = (inputs, userData) => (dispatch) => {
	if (inputs === undefined) {
		return null;
	}
	axios({
		method  : 'post',
		url     : `http://localhost:3001/api/users/${inputs.id}/post`,
		data    : userData,
		headers : {
			'content-type' : `multipart/form-data; boundary=${userData._boundary}`
		}
	})
		.then((response) => {
			dispatch({
				type    : ADD_NEW_POST,
				payload : response.data.post
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

// Sign up. save the Token & handle Error Message
export const signUp = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post('http://localhost:4000/api/users/signup', data);
			dispatch({
				type    : CREATE_USER,
				payload : response.data.token
			});
			localStorage.setItem('JWT_TOKEN', response.data.token);
			axios.defaults.headers.common['Authorization'] = response.data.token;
			dispatch({ type: SAVE_LOGGED_IN_USER, payload: response.data.user });
		} catch (err) {
			dispatch({
				type    : ERROR,
				payload : 'Email is taken'
			});
		}
	};
};

export const signIn = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post('http://localhost:3001/api/users/signin', data);
			dispatch({
				type    : SIGN_IN,
				payload : response.data.token
			});
			localStorage.setItem('JWT_TOKEN', response.data.token);
			// dispatch({ type: 'SAVE_LOGGED_IN_USER', payload: response.data.user })
			axios.defaults.headers.common['Authorization'] = response.data.token;
			dispatch({
				type    : SAVE_LOGGED_IN_USER,
				payload : response.data.user
			});
		} catch (err) {
			dispatch({
				type    : ERROR,
				payload : 'oooops invalid combination'
			});
		}
	};
};

// SignOut

export const signOut = () => {
	return (dispatch) => {
		localStorage.clear('jwt_token');
		axios.defaults.headers.common['Authorization'] = '';
		dispatch({
			type    : SIGN_OUT,
			payload : ''
		});
	};
};
