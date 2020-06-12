import * as React from 'react';
import { Button, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

function ProfileScreen({ navigation }) {
	/* if (userLoggedIn === true) {
		navigation.navigate('Posts');
	} */
	return (
		<View style={styles.container}>
			<Text>PROFILE PAGE</Text>
			<TouchableHighlight
				style={styles.buttonContainer}
				onPress={() => {
					/* 1. Navigate to the Login route with params */
					this.props.navigation.navigate('Login', {
						itemId     : 86,
						otherParam : 'anything you want here'
					});
				}}
			>
				<Text style={styles.buttonText}>Login to continue</Text>
			</TouchableHighlight>

			<TouchableHighlight
				style={styles.buttonContainer}
				onPress={() => {
					/* 1. Navigate to the Profile route with params */
					navigation.navigate('SignUp', {
						itemId     : 22,
						otherParam : 'okay i can give anything i want here for signup page'
					});
				}}
			>
				<Text style={styles.buttonText}>Sign up to continue</Text>
			</TouchableHighlight>

			{/* change the header name/title */}
			{/* <Button title="Update the title" onPress={() => navigation.setOptions({ title: 'Updated!' })} /> */}
		</View>
	);
}

export default ProfileScreen;

const styles = StyleSheet.create({
	container       : {
		flex : 1
		/* 	alignItems     : 'center',
		justifyContent : 'center' */
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
	buttonText      : {
		color : 'skyblue'
	}
});
