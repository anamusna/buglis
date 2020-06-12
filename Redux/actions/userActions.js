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
	GET_USER,
	GET_USER_SUCCESS,
	GET_USER_FAILED
} from '../actions/types';
import { api } from '../../api/api';
import deviceStorage from '../../deviceStorage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import JWT from 'expo-jwt';

/* const api = 'http://192.168.178.36:3001'; */

const configToken = require('../../config');
const config = {
	headers : {
		Accept         : 'application/json',
		'Content-Type' : 'application/json'
	}
};

const userEndpoint = '/api/user/show?id=';
const usersEndpoint = '/api/user/list';
const endpoint = '/api/user/signup';
const loginPoint = '/api/user/signin';

export const createUser = (data) => {
	return async (dispatch) => {
		try {
			const response = await axios.post(`${api}${endpoint}`, data, config);
			console.log('CREATE RESPONSE ####', response);
			dispatch({
				type    : CREATE_USER,
				payload : response.data
			});
			console.log('CREATE TOKEN ####', response.data);
			deviceStorage.saveItem('token', response.data.token);
			/* deviceStorage.saveItem("avatar", response.data.avatar); */
			console.log('XXXXX USER ####', response.data.user);
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
	/* 	console.log('Data action ####', data); */
	return (dispatch) => {
		dispatch({ type: LOGIN });
		return axios
			.post(`${api}${loginPoint}`, data, config)
			.then((response) => {
				/* 	console.log('RESPONSE ####', response.data); */
				if (response.status === 200) {
					dispatch({
						type    : LOGIN_SUCCESS,
						payload : response.data
					});
					console.log('Token response ####', response.data.token);
					if (response.data.token) {
						deviceStorage.saveItem('token', response.data.token);
						console.log('SAVE TOKEN ####', response.data.token);

						dispatch({
							type    : SAVE_LOGGED_IN_USER,
							payload : response.data.token
						});
					}
				}
			})
			.catch((error) => {
				dispatch({
					type    : LOGIN_FAILED,
					payload : error
				});
				return null;
			});
	};
};

/* Get a User */
/* export function getUser() {
	return (dispatch) => {
		dispatch({ type: GET_USER, payload: response.data });

		const token = deviceStorage.getItem('token');
		console.log('RESPONSE GET TOKEN ####', token);

		const decodedJwt = JWT.decode(token, configToken.SECRET_TOKEN);
		const id = decodedJwt.sub;
		axios
			.get(`${api}${userEndpoint}/${id}`, config)
			.then((response) => {
				console.log('RESPONSE GET USER ####', response.data);

				dispatch({
					type    : GET_USER_SUCCESS,
					payload : response.data
				});
			})
			.catch((error) => {
				dispatch({ type: GET_USER_FAILED, payload: error });
			});
} */

export function getUser(id) {
	console.log('#####GET USER DATA####', id);
	/* const id = ''; */
	return (dispatch) => {
		return axios
			.get(`${api}${userEndpoint}${id}`, config)
			.then((response) => {
				console.log('RESPONSE GET USER DATA####', response.data.user);
				dispatch({
					type    : GET_USER,
					payload : response.data
				});
				dispatch({
					type    : GET_USER_SUCCESS,
					payload : response.data.user
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
	axios.get(`${api}${usersEndpoint}`, config).then((response) => {
		if (response) {
			console.log('RESPONSE GET ALL USERS ####', response.data);
			dispatch({
				type    : GET_ALL_USERS,
				payload : response.data
			});
		} else {
			console.log('RESPONSE GET ALL USERS ####', data);
		}
	});
};

// SignOut

export const signOut = () => {
	return (dispatch) => {
		console.log('token removed');
		deviceStorage.deleteItem('token');
		/* await deviceStorage.deleteItem('avatar'); */
		console.log('token removed');
		axios.defaults.headers.common['Authorization'] = '';
		dispatch({
			type    : LOGOUT,
			payload : ''
		});
	};
};
