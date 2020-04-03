import React, { Component } from 'react';
import axios from 'axios';
import { api } from '../../api';
import * as actions from '../../Redux/actions/userActions';
import SearchBox from './SearchBox';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import UploadAvatar from './uploadAvatar';
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
import { createUser } from '../../Redux/actions/userActions';
import { AntDesign } from '@expo/vector-icons';

class SignUpScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	getUri = (uri) => {
		console.log(uri);
		this.setState({ avatar: uri });
	};
	onChangeValue = (key, value) => {
		this.setState({ [key]: value });
		/* console.log('ONCHANGE', this.state); */
	};
	/* 	getUri = (uri) => {
		console.log(uri);
		this.setState({ avatar: uri });
	}; */

	submitSignUp = () => {
		let data = JSON.stringify({
			name     : this.state.name,
			email    : this.state.email,
			username : this.state.username,
			password : this.state.password
		});

		console.log('USER SIGNUP STATE', data);
		this.props.dispatchCreateUser(data);
		if (data) {
			this.props.navigation.navigate('Posts');
		}
	};

	componentDidMount() {
		const { user } = this.props;
		console.log('USER component STATE', user);
		/* 	this.setState({ user: this.props.user }); */
		this.props.dispatchCreateUser();
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* 	<SearchBox {...this.props} /> */}

				<ScrollView>
					<View style={styles.container}>
						<View style={{ marginTop: 30 }}>
							<UploadAvatar
								getUri={this.getUri}
								payloadKey="avatar"
								endpoint={api + '/api/user/save'}
								callbackUrl="https://cdn.pixabay.com/photo/2017/08/16/00/29/add-person-2646097_960_720.png"
							/>
						</View>
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
						<Button
							title="Sign up"
							style={[ styles.buttonContainer, styles.signupButton ]}
							onPress={() => this.submitSignUp()}
						/>
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

function mapStateToProps(state) {
	const { user } = state;
	console.log('SIGN Redux UP', user);
	return {
		user : user
	};
}

const mapDispatchToProps = {
	dispatchCreateUser : createUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

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
		height : 60,
		margin : 5
	}
});
