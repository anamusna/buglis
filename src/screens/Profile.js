import React from 'react';
import { View, Text, StyleSheet, Image, Button, AsyncStorage, TouchableOpacity, ScrollView } from 'react-native';
import { api } from '../../api';
const config = require('../../config');
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import JWT from 'expo-jwt';

import { MaterialIcons, AntDesign } from '@expo/vector-icons/';
import AddPosts from './AddPosts';
import { connect } from 'react-redux';
import { getUser, signOut } from '../../Redux/actions/userActions';

export const userID = () => {
	console.log('yup', UserProfile);
};
class ProfileScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			token  : null,
			user   : [],
			avatar : ''
		};
	}

	logout = async () => {
		this.signOut;
		this.props.navigation.navigate('Login');

		/* try {
			await AsyncStorage.removeItem('token');

			this.setState({
				token        : null,
				userLoggedIn : false,
				loading      : false
			});
			console.log('token removed');
			this.props.navigation.navigate('Logi'n);
		} catch (err) {
			console.log(`The error is: ${err}`);
		} */
	};

	componentDidMount = async () => {
		/* 	const token = await AsyncStorage.getItem('token');
		const decodedJwt = JWT.encode(token, config.SECRET_TOKEN);
		console.log('PROFILE vvv TOKENh', decodedJwt);

		const decoded = JWT.decode(decodedJwt, config.SECRET_TOKEN);
		console.log('###########ffffff', decoded);
		const id = decoded; */
		const id = '5ec07a4553df9269c448d4fc';

		this.props.dispatchgetUser(id);
		this.setState({
			token : id,
			user  : this.props.user
		});
		console.log('profile tokeb ###########', this.props.user, 'ID', id);
	};

	render() {
		/* console.log('PROFILE  STATE XXX', this.props.user); */
		return (
			<ScrollView>
				<View style={styles.main}>
					<View style={styles.addPost}>
						<AddPosts />
						<Button title="logout" onPress={() => this.logout()} />
					</View>
					{/* 	{this.state.user.length > 0 ? (
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
											fontSize : 22,
											padding  : 3
										}}
									>
										{user.first_name}
									</Text>
									<Text
										style={{
											fontSize : 14,
											padding  : 3
										}}
									>
										{user.name}
									</Text>
									<Text>{user.email}</Text>
									<Text>{user.username}</Text>
								</View>
							</View>



						))
					) : null} */}
				</View>
			</ScrollView>
		);
	}
}
function mapStateToProps(state) {
	const { user } = state;
	/* console.log('Profile COMPONENT STATE', user); */
	return {
		user
	};
}
const mapDispatchToProps = {
	dispatchgetUser : getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
const styles = StyleSheet.create({
	main            : {
		margin       : 10,
		borderRadius : 10,
		borderColor  : '#85c4ea',
		borderWidth  : 2
	},
	infoText        : {
		textAlign : 'left',
		color     : '#0ec485',
		fontSize  : 16
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
