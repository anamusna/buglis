import React from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import UploadAvatar from './uploadAvatar';
import { api } from '../../api';
import axios from 'axios';

export default class ProfileScreen extends React.Component {
	constructor() {
		super();
		this.state = {
			id_token : null,
			user     : [],
			userID   : null
		};
	}

	componentDidMount = async () => {
		let tokenStorage = await AsyncStorage.getItem('id_token');
		console.log('PROFILE PROPS', this.props.route);
		this.setState({ id_token: tokenStorage });
		const id = this.props.navigation.state.params.id;
		this.setState({
			userID : id
		});

		axios
			.get(api + '/api/user/showDetails?id=' + id)
			.then((response) => {
				if (response.data[0].hasOwnProperty('name')) {
					this.setState({
						user : response.data
					});
				} else {
					this.setState({
						user : response.data
					});
				}
			})
			.catch((error) => {
				// dispatch({ type: GET_POST_FAILURE, payload: error });
				console.log(error);
			});
	};

	render() {
		const { id_token } = this.state;
		console.log('PROFILE TOKEN STATE XXX', id_token);
		const isEnabled = id_token !== null;
		return (
			<View style={styles.scrollstyle}>
				<ScrollView ref="scrollView">
					<View
						style={{
							flex           : 1,
							justifyContent : 'center',
							marginTop      : 20
						}}
					>
						<TouchableHighlight
							style={styles.buttonContainer}
							onPress={() => {
								/* 1. Navigate to the Profile route with params */
								this.props.navigation.navigate('Login', {
									itemId     : 22,
									otherParam : 'okay i can give anything i want here for login page'
								});
							}}
						>
							<Text style={styles.buttonText}>Login to continue</Text>
						</TouchableHighlight>
						<View style={styles.bodyContentProfile}>
							{/* this.state._fontLoaded && */ this.state.user.length > 0 ? (
								this.state.user.map((user, i) => (
									<View
										style={{
											alignItems     : 'center',
											justifyContent : 'center'
										}}
										key={i}
									>
										<View style={styles.main}>
											<UploadAvatar
												payloadKey="file"
												endpoint={api + '/api/user/save_avatar'}
												callbackUrl={
													typeof user.avatar == 'string' ? (
														api + user.avatar
													) : (
														api + '/' + user.avatar[0].path
													)
												}
											/>

											<View style={styles.headInfos} />
											<Text style={{ fontFamily: 'Roboto-Black', fontSize: 22 }}>
												{user.name}
											</Text>
											<Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14 }}>
												{user.name}
											</Text>
										</View>
										<View style={styles.paragraphText}>
											<Text>{user.email}</Text>
											<Text>{user.username}</Text>
										</View>
									</View>
								))
							) : null}
						</View>
						<Button
							disabled={!isEnabled}
							buttonStyle={{
								backgroundColor : '#85c4ea'
							}}
							title="send a post*"
							onPress={() =>
								this.props.navigation.navigate('RequestFormular', {
									userID : this.state.userID
								})}
						/>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	bodyContentProfile : {
		flex            : 1,
		margin          : 10,
		marginTop       : 25,
		alignItems      : 'center',
		backgroundColor : 'white'
	},
	servicesList       : {
		textAlign : 'left',
		color     : '#0ec485'
	},
	scrollStyle        : {
		flexGrow : 1
	},
	geo                : {
		margin         : 0,
		justifyContent : 'center',
		width          : '100%',
		height         : 320,
		marginTop      : -40
	},
	button             : {
		alignSelf    : 'center',
		width        : '90%',
		marginBottom : 80
	},
	main               : {
		alignItems   : 'center',
		borderRadius : 10
	},
	headInfos          : {
		marginTop    : -10,
		marginBottom : 10,
		alignItems   : 'center'
	},
	paragraphText      : {
		textAlign : 'left',
		alignSelf : 'flex-start',
		padding   : 10
	},
	infoText           : {
		fontFamily : 'Roboto-Light',
		textAlign  : 'left',
		alignSelf  : 'flex-start'
	}
});
