import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../../api';
import deviceStorage from '../../deviceStorage';
import Menu from './Menu';
import { ScrollView } from 'react-native-gesture-handler';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	Alert,
	Button
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class SignUpScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name     : '',
			email    : '',
			username : '',
			password : '',
			signedUp : false
		};
	}
	onChangeValue = (key, value) => {
		this.setState({ [key]: value });
	};
	/* 	getUri = (uri) => {
		console.log(uri);
		this.setState({ avatar: uri });
	}; */

	submitSignUp = () => {
		const userData = new FormData();
		userData.append('name', this.state.name);
		userData.append('email', this.state.email);
		userData.append('username', this.state.username);
		userData.append('password', this.state.password);
		console.log('AHAAA', this.state.user);
		const config = {
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'multipart/form-data'
			}
		};

		axios
			.post('http://192.168.178.21:3001/api/users/signup', userData)
			.then((response) => {
				this.setState({ user: response.data });
				console.log('user list', response);
			})
			.catch((error) =>
				this.setState({
					error : error
				})
			);
	};

	render(navigation) {
		return (
			<View style={{ flex: 1 }}>
				<TouchableHighlight style={styles.menuButton}>
					<Menu {...this.props} />
				</TouchableHighlight>
				<ScrollView>
					<View style={styles.container}>
						<TouchableOpacity /* onPress={() => this.props.navigation.navigate('Profile')} */>
							<Image
								style={{
									width        : 80,
									height       : 80,
									margin       : 10,
									marginTop    : 15,
									marginBottom : 15
								}}
								source={require('../../assets/logo.png')}
							/>
						</TouchableOpacity>
						<Text style={{ color: 'red' }}>{this.state.errors}</Text>

						<View style={styles.inputContainer}>
							<TextInput
								name="name"
								style={styles.inputs}
								placeholder="Name"
								onChangeText={(value) => this.onChangeValue('name', value)}
								placeholderStyle={{ paddingLeft: 10 }}
								keyboardType="email-address"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								value={this.state.name}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								name="email"
								style={styles.inputs}
								onChangeText={(value) => this.onChangeValue('email', value)}
								placeholder="Email"
								placeholderStyle={{ paddingLeft: 10 }}
								keyboardType="email-address"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								value={this.state.email}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								name="username"
								style={styles.inputs}
								placeholder="Username"
								onChangeText={(value) => this.onChangeValue('username', value)}
								placeholderStyle={{ paddingLeft: 10 }}
								keyboardType="email-address"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								value={this.state.username}
							/>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								name="password"
								style={styles.inputs}
								secureTextEntry
								onChangeText={(value) => this.onChangeValue('password', value)}
								placeholder="Password"
								placeholderStyle={{ paddingLeft: 10 }}
								keyboardType="email-address"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								value={this.state.password}
							/>
						</View>
						<TouchableHighlight
							style={[ styles.buttonContainer, styles.signupButton ]}
							onPress={() => this.submitSignUp()}
						>
							<Text style={styles.signupText}>Sign up</Text>
						</TouchableHighlight>
					</View>
					<TouchableHighlight
						style={styles.buttonContainer}
						onPress={() => this.props.navigation.navigate('Login')}
					>
						<Text>Already registered? Login</Text>
					</TouchableHighlight>
				</ScrollView>
			</View>
		);
	}
}

export default SignUpScreen;

const styles = StyleSheet.create({
	container       : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#ebebeb'
	},
	inputContainer  : {
		borderBottomColor : '#F5FCFF',
		backgroundColor   : '#FFFFFF',
		borderRadius      : 5,
		borderBottomWidth : 1,
		width             : 250,
		height            : 50,
		marginBottom      : 20,
		flexDirection     : 'row',
		alignItems        : 'center'
	},
	inputs          : {
		height            : 50,
		marginLeft        : 16,
		borderBottomColor : '#FFFFFF',
		flex              : 1
	},
	inputIcon       : {
		width          : 30,
		height         : 30,
		marginLeft     : 15,
		justifyContent : 'center'
	},
	buttonContainer : {
		justifyContent : 'center',
		alignItems     : 'center',
		marginBottom   : 20,
		width          : 250,
		margin         : 4,
		padding        : 5,
		borderRadius   : 5,
		borderWidth    : 1,
		borderColor    : '#85c4ea',
		maxHeight      : 100,
		alignSelf      : 'center'
	},
	loginButton     : {
		backgroundColor : '#00b5ec'
	},
	loginText       : {
		color : 'white'
	},
	menuButton      : {
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end',
		padding        : 2,
		margin         : 5
	}
});
