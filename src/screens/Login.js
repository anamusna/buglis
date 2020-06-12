import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../../api';
import deviceStorage from '../../deviceStorage';
import * as actions from '../../Redux/actions/userActions';
import SearchBox from './SearchBox';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';

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
import { connect } from 'react-redux';
import { LoginUser, signOut } from '../../Redux/actions/userActions';
import { AntDesign } from '@expo/vector-icons';

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email        : '',
			password     : '',
			userLoggedIn : false,
			errors       : ''
		};
	}

	onChangeValue = (key, value) => {
		this.setState({ [key]: value });
	};

	submitLogin = () => {
		let data = JSON.stringify({
			username : this.state.username,
			password : this.state.password
		});
		if (this.state.username !== '') {
			this.props.dispatchLoginUser(data);
			this.setState({
				userLoggedIn : true
			});
			this.props.navigation.navigate('Posts');
			console.log('USER STATE', data);
		} else {
			this.setState({
				userLoggedIn : false,
				errors       : 'You are not registered'
			});
			console.log('You are not registered');
		}
	};

	componentDidMount = async () => {
		const token = await AsyncStorage.getItem('token');
		console.log('LOGIN TOKEN STATE XXX', token);
		if (token !== null) {
			this.setState({
				token        : token,
				userLoggedIn : true
			});
			this.props.navigation.navigate('Posts');
		} else {
			console.log('LOGIN component TOKEN STATE XXX', this.props.user.token);
			this.setState({
				token        : '',
				userLoggedIn : false
			});
		}
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* 	<SearchBox {...this.props} /> */}

				<ScrollView>
					<View style={styles.container}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
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
							<Image
								style={styles.inputIcon}
								source={{
									uri : 'https://png.icons8.com/message/ultraviolet/50/3498db'
								}}
							/>
							<TextInput
								name="username"
								style={styles.inputs}
								onChangeText={(value) => this.onChangeValue('username', value)}
								placeholder="Username"
								placeholderStyle={{ paddingLeft: 10 }}
								keyboardType="email-address"
								underlineColorAndroid="transparent"
								autoCapitalize="none"
								value={this.state.username}
							/>
						</View>

						<View style={styles.inputContainer}>
							<Image
								style={styles.inputIcon}
								source={{
									uri : 'https://png.icons8.com/key-2/ultraviolet/50/3498db'
								}}
							/>
							<TextInput
								style={styles.inputs}
								name="password"
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
							style={[ styles.buttonContainer, styles.loginButton ]}
							onPress={() => this.submitLogin()}
						>
							<Text style={styles.loginText}>Login</Text>
						</TouchableHighlight>
						<View
							style={{
								display : 'flex'
							}}
						>
							<Button
								title="Register"
								style={styles.buttonContainer}
								onPress={() => this.props.navigation.navigate('SignUp')}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
function mapStateToProps(state) {
	const { user } = state;
	/* 	console.log('LOGIN COMPONENT STATE', user); */
	return {
		user
	};
}
const mapDispatchToProps = {
	dispatchLoginUser : LoginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
	container       : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
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
		height : 65,
		margin : 5
	}
});
