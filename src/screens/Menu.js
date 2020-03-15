import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Modal,
	Button,
	Text,
	TouchableHighlight,
	View,
	Alert
} from 'react-native';

function Menu({ route, navigation }) {
	return (
		<TouchableOpacity style={styles.menu}>
			<AntDesign
				name="bars"
				/* name="home" */
				size={40}
				color="black"
				style={{ backgroundColor: '#fff' }}
				onPress={() => navigation.toggleDrawer()}
			/>
		</TouchableOpacity>
	);
}
export default Menu;

const styles = StyleSheet.create({
	menu       : {
		backgroundColor : 'pink'
	},
	menuButton : {
		width          : 60,
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end'
	}
});
