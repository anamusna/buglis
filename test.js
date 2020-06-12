/* SIGN UP */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, ScrollView } from 'react-native';
import Wizard from './Wizard';

import { api } from '../../api/api';
import axios from 'axios';
import UploadAvatar from '../Profile/UploadAvatar';
import deviceStorage from '../../services/deviceStorage';

submitSignUp = () => {
	const options = {
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'multipart/form-data'
		}
	};
	axios
		.post(api + '/api/user/save', this.state)
		.then((response) => {
			deviceStorage.saveItem('id_token', response.data.token);
			deviceStorage.saveItem('avatar', this.state.avatar);
			this.props.navigation.navigate('SignupAnimation', {
				id_token : response.data.token,
				avatar   : this.state.avatar
			});
		})
		.catch((error) =>
			this.setState({
				error : error
			})
		);
};

/* LOG IN */

login = () => {
	if (this.state.email !== '') {
		return axios
			.post(api + '/api/login', {
				email    : this.state.email,
				password : this.state.password
			})
			.then((response) => {
				if (response.status === 200) {
					if (response.data.token) {
						deviceStorage.saveItem('id_token', response.data.token);
						deviceStorage.saveItem('avatar', response.data.avatar);
						this.setState({
							userLoggedIn : true
						});

						this.props.navigation.navigate('LoginAnimation', {
							id_token : response.data.token
						});
					} else {
						this.setState({
							userLoggedIn : false,
							errors       : 'You are not registered'
						});
						console.log('You are not registered');
					}
				}
			})
			.catch((error) => {
				throw error;
			});
	} else {
		this.setState({
			userLoggedIn : false,
			errors       : 'Please, fill the inputs'
		});
	}
};
