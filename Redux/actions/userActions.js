import axios from 'axios';

import {
	CREATE_USER,
	CREATE_USER_SUCCESS,
	CREATE_USER_FAILED,
	LOGIN,
	LOGOUT,
	SET_USERNAME,
	SET_PASSWORD,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	GET_ALL_USERS,
	SAVE_LOGGED_IN_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED
} from '../actions/types';
import { api } from '../../api/api';

import { AsyncStorage } from 'react-native';
/* const api = 'http://192.168.178.36:3001'; */

const config = {
	headers : {
		Accept         : 'application/json',
		'Content-Type' : 'application/json'
	}
};

const userEndpoint = '/api/user/list';
const endpoint = '/api/user/signup';
const loginPoint = '/api/user/signin';

export const createUser = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api}${endpoint}`, data, config);
			dispatch({
				type    : CREATE_USER,
				payload : response.data
			});
			console.log('CREATE TOKEN ####', response.data);
			AsyncStorage.setItem('id_token', response.data.token);

			/* AsyncStorage.setItem('avatar', this.state.avatar); */
			axios.defaults.headers.common['Authorization'] = response.data.token;
			dispatch({ type: CREATE_USER_SUCCESS, payload: response.data.user });
		} catch (error) {
			dispatch({
				type    : CREATE_USER_FAILED,
				payload : error
			});
		}
	};
};

/* Login */

export const LoginUser = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api}${loginPoint}`, data, config);
			dispatch({
				type    : LOGIN,
				payload : response.data
			});
			AsyncStorage.setItem('id_token', response.data.token);

			console.log('TOKEN ####', response.data.token);
			axios.defaults.headers.common['Authorization'] = response.data.token;
			dispatch({
				type    : LOGIN_SUCCESS,
				payload : response.data.token
			});
		} catch (err) {
			dispatch({
				type    : LOGIN_FAILED,
				payload : error
			});
		}
	};
};

/* Get a User */
export function getUser() {
	return (dispatch) => {
		dispatch({ type: GET_USER });

		return axios
			.get(`${api}${userEndpoint}`, config)
			.then((response) => {
				if (response.data.token) {
					AsyncStorage.setItem('id_token', response.data.token);
					console.log('GET USER TOKEN ####', response.data.token);
					dispatch({
						type    : GET_USER_SUCCESS,
						payload : response.data.token
					});

					axios.defaults.headers.common['Authorization'] = response.data.token;
					dispatch({
						type    : GET_USER_SUCCESS,
						payload : response.data.token
					});
				}
			})
			.catch((error) => {
				dispatch({
					type    : GET_USER_FAILED,
					payload : error
				});
				return null;
			});
	};
}

/* Get all users */
export const getAllUsers = () => (dispatch) => {
	axios.get('http://localhost:3001/api/users').then((response) => {
		dispatch({
			type    : GET_ALL_USERS,
			payload : response.data
		});
	});
};

// SignOut

export const signOut = () => {
	return async (dispatch) => {
		console.log('token removed');
		try {
			await AsyncStorage.removeItem('id_token');
			/* await AsyncStorage.removeItem('avatar'); */
			console.log('token removed');
			axios.defaults.headers.common['Authorization'] = '';
			dispatch({
				type    : LOGOUT,
				payload : ''
			});
		} catch (err) {
			console.log(`The error is: ${err}`);
		}
	};
};
