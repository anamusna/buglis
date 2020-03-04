import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	ScrollView,
	Alert,
	Button
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email        : '',
			password     : '',
			userLoggedIn : false,
			errors       : ''
		};
	}

	static navigationOptions = {
		headerTitle     : ' SignUp',
		headerStyle     : { backgroundColor: '#white' },
		headerTintColor : '#85c4ea'
	};

	componentWillUnmount() {
		this.setState({ errors: '' });
	}
	onChangeText = (key, val) => {
		this.setState({ [key]: val });
	};

	/*   login = () => {
    if (this.state.email !== "") {
      return axios
        .post(api + "/api/login", {
          email: this.state.email,
          password: this.state.password
        })
        .then(response => {
          if (response.status === 200) {
            if (response.data.token) {
              deviceStorage.saveItem("id_token", response.data.token);
              deviceStorage.saveItem("avatar", response.data.avatar);
              this.setState({
                userLoggedIn: true
              });

              this.props.navigation.navigate("LoginAnimation", {
                id_token: response.data.token
              });
            } else {
              this.setState({
                userLoggedIn: false,
                errors: "You are not registered"
              });
              console.log("You are not registered");
            }
          }
        })
        .catch(error => {
          throw error;
        });
    } else {
      this.setState({
        userLoggedIn: false,
        errors: "Please, fill the inputs"
      });
    }
  }; */

	render() {
		return (
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
						<Image
							style={styles.inputIcon}
							source={{
								uri : 'https://png.icons8.com/message/ultraviolet/50/3498db'
							}}
						/>
						<TextInput
							style={styles.inputs}
							placeholder="Email"
							keyboardType="email-address"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							onChangeText={(email) => this.setState({ email, errors: '' })}
						/>
					</View>

					<View style={styles.inputContainer}>
						<TextInput
							name="first_name"
							style={styles.inputs}
							/* onChangeText={(text) => onChangeValue('first_name', text)} */
							placeholder="Name"
							/* 		value={values.first_name} */
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							name="last_name"
							style={styles.inputs}
							onChangeText={(text) => onChangeValue('last_name', text)}
							placeholder="Last Name"
							/* value={values.last_name} */
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							name="email"
							style={styles.inputs}
							onChangeText={(text) => onChangeValue('email', text)}
							placeholder="Email"
							/* value={values.email} */
							autoCapitalize="none"
						/>
					</View>
					<View>
						<Text style={[ styles.small, { paddingTop: 10, paddingBottom: 2 } ]}>
							We'll never share your email with anyone else.
						</Text>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							name="password"
							style={styles.inputs}
							secureTextEntry
							onChangeText={(text) => onChangeValue('password', text)}
							placeholder="Password"
							/* value={values.password} */
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

function SignUpScreen({ route, navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<TouchableHighlight style={styles.menuButton}>
				<AntDesign
					name="bars"
					size={40}
					color="blue"
					style={{ padding: 2 }}
					onPress={() => navigation.toggleDrawer()}
				/>
			</TouchableHighlight>
			<ScrollView>
				<SignUp />
				<TouchableHighlight style={styles.buttonContainer} onPress={() => navigation.navigate('Login')}>
					<Text>Already registered? Login</Text>
				</TouchableHighlight>
			</ScrollView>
		</View>
	);
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
