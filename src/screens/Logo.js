import React, { Component } from 'react';

import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Modal,
	Image,
	Button,
	Text,
	TouchableHighlight,
	View,
	Alert
} from 'react-native';
import { AntDesign, Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
function LogoTitle(navigation) {
	/* console.log('GGGGGGG profile', navigation); */

	return (
		<TouchableOpacity
			style={styles.logo}
			onPress={() => {
				navigation.navigation.navigate('Profile');
			}}
		>
			<MaterialCommunityIcons color="white" name="account" size={40} />
			{/* 	<Image
				
				style={styles.logoButton}
				source={require('../../assets/logo.png')}
				onPress={() => alert('This is a button!')}
			/> */}
		</TouchableOpacity>
	);
}

export default LogoTitle;

const styles = StyleSheet.create({
	logo : {
		width           : 50,
		/* 	height         : 50 ,*/
		padding         : 2,
		marginRight     : 10,
		justifyContent  : 'center',
		justifyContent  : 'center',
		alignItems      : 'center',
		borderRadius    : 50,
		backgroundColor : 'skyblue'
	}
});
