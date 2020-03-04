import React, { Component } from 'react';

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableHighlight,
	ScrollView,
	Image,
	Alert,
	Button
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class Login extends Component {
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
		headerTitle     : ' Login',
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
						style={styles.inputs}
						placeholder="Email"
						keyboardType="email-address"
						underlineColorAndroid="transparent"
						autoCapitalize="none"
						onChangeText={(email) => this.setState({ email, errors: '' })}
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
						placeholder="Password"
						secureTextEntry={true}
						underlineColorAndroid="transparent"
						autoCapitalize="none"
						onChangeText={(password) => this.setState({ password, errors: '' })}
					/>
				</View>
				<TouchableHighlight style={[ styles.buttonContainer, styles.loginButton ]} onPress={() => this.login()}>
					<Text style={styles.loginText}>Login</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
function LoginScreen({ route, navigation }) {
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
				<Login />
				<View
					style={{
						display : 'flex'
					}}
				>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SignUp')}>
						<Text style={{ color: '#85c4ea' }}>Register</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
export default LoginScreen;

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
