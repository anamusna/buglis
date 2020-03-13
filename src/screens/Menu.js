import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';

function Menu({ route, navigation }) {
	/* console.log('routesssw', route, navigation); */
	return (
		<View style={styles.menu}>
			<TouchableHighlight style={styles.menuButton}>
				<AntDesign
					name="bars"
					size={40}
					color="blue"
					style={{ padding: 2 }}
					onPress={() => navigation.toggleDrawer()}
				/>
			</TouchableHighlight>
		</View>
	);
}
export default Menu;

const styles = StyleSheet.create({
	menu       : {
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end'
	},
	menuButton : {
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end',
		padding        : 2,
		margin         : 5
	}
});
