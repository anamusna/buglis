import React from 'react';
import { View, Text, StyleSheet, Image, Button, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import { api } from '../../api';
const config = require('../../config');
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import JWT from 'expo-jwt';
import { MaterialIcons, AntDesign } from '@expo/vector-icons/';
import AddPosts from './AddPosts';

export const userID = () => {
	console.log('yup', UserProfile);
};
export default class ProfileScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			token  : null,
			user   : [],
			avatar : ''
		};
	}

	logout = async () => {
		try {
			await AsyncStorage.removeItem('id_token');
			/* await AsyncStorage.removeItem('avatar'); */
			this.setState({
				token        : null,
				userLoggedIn : false,
				loading      : false
			});
			console.log('token removed');
			this.props.navigation.navigate('Login');
		} catch (err) {
			console.log(`The error is: ${err}`);
		}
	};

	componentDidMount = async () => {
		const token = await AsyncStorage.getItem('id_token');

		const id = token;
		this.setState({ token: id });
		await axios
			.get(api + '/api/user/showDetails?id=' + id)
			.then((response) => {
				console.log('PROFILE TOKEN STATE XXX', response);
				this.setState({
					user : response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.main}>
					<View style={styles.addPost}>
						<AddPosts />
						<Button title="logout" onPress={() => this.logout()} />
					</View>
					{this.state.user.length > 0 ? (
						this.state.user.map((user, i) => (
							<View
								style={{
									flexDirection  : 'column',
									justifyContent : 'center',
									alignItems     : 'center'
								}}
								key={i}
							>
								<View>
									<Image
										source={{ uri: user.avatar }}
										style={{
											width        : 130,
											height       : 130,
											borderRadius : 50,
											margin       : 30
										}}
									/>
								</View>
								<View>
									<Text
										style={{
											fontFamily : 'Roboto-Black',
											fontSize   : 22,
											padding    : 3
										}}
									>
										{user.first_name}
									</Text>
									<Text
										style={{
											fontFamily : 'Roboto-Medium',
											fontSize   : 14,
											padding    : 3
										}}
									>
										{user.name}
									</Text>
									<Text>{user.email}</Text>
									<Text>{user.username}</Text>
								</View>
							</View>
						))
					) : null}
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	main            : {
		margin       : 10,
		borderRadius : 10,
		borderColor  : '#85c4ea',
		borderWidth  : 2
	},
	infoText        : {
		fontFamily : 'Roboto-Light',
		textAlign  : 'left',
		color      : '#0ec485',
		fontSize   : 16
	},
	buttons         : {
		flexDirection : 'row',
		marginRight   : 15,
		alignSelf     : 'flex-end'
	},
	button          : {
		alignItems      : 'center',
		justifyContent  : 'center',
		position        : 'relative',
		borderWidth     : 1,
		borderRadius    : 50,
		margin          : 5,
		marginTop       : 30,
		width           : 50,
		height          : 50,
		bottom          : 10,
		backgroundColor : '#85c4ea',
		marginBottom    : 10,
		borderColor     : '#85c4ea'
	},
	paragraphText   : {
		marginLeft : 20,
		width      : 300,
		margin     : 10
	},
	estimationsList : {
		textAlign : 'left',
		color     : '#0ec485'
	}
});
