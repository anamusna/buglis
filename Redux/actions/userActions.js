import axios from 'axios';

import { CREATE_USER, LOGIN, GET_ALL_USERS } from '../actions/types';
/* import { api } from '../../api/api'; */

const api = 'http://192.168.178.21:3001';
const config = {
	headers : {
		Accept         : 'application/json',
		'Content-Type' : 'application/json'
	}
};

const userEndpoint = '/api/user/list';
const endpoint = '/api/user/signup';
const loginPoint = '/api/user/signin';

export function createUser(user) {
	return (dispatch) => {
		dispatch({ type: CREATE_USER });
		return axios
			.post(`${api}${endpoint}`, user, config)
			.then((response) => {
				console.log('ACTION RESPONSE', response);
				dispatch({
					type    : CREATE_USER,
					payload : response.data
				});
			})
			.catch((error) => {
				dispatch({
					type    : CREATE_USER,
					payload : error
				});
				return null;
			});
	};
}

/* Login */

export function LoginUser(user) {
	console.log('Login Action', user);
	return (dispatch) => {
		dispatch({ type: LOGIN });
		return axios
			.post(`${api}${loginPoint}`, user, config)
			.then((response) => {
				console.log('LOGIN RESPONSE', response);
				dispatch({
					type    : LOGIN,
					payload : response.data
				});
			})
			.catch((error) => {
				dispatch({
					type    : LOGIN,
					payload : error
				});
				return null;
			});
	};
}

/* Get a User */
export function getUser() {
	return (dispatch) => {
		dispatch({ type: GET_USER });

		return axios
			.get(`${api}${userEndpoint}`, config)
			.then((response) => {
				dispatch({
					type    : GET_USER_SUCCESS,
					payload : response.data
				});
			})
			.catch((error) => {
				dispatch({
					type    : GET_USER_FAILED,
					payload : []
				});
				return null;
			});
	};
}

/* Get all users */
export const getAllUsers = () => (dispatch) => {
	axios.get('http://localhost:3001/api/users').then((res) => {
		dispatch({
			type    : GET_ALL_USERS,
			payload : res.data
		});
	});
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
