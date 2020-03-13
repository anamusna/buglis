import React, { Component } from 'react';

import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';

function LogoTitle() {
	return (
		<Button
			title="logo"
			style={{ width: 50, height: 50 }}
			/* source={require('./assets/logo.png')} */

			onPress={() => alert('This is a button!')}
		/>
	);
}

export default LogoTitle;

const styles = StyleSheet.create({
	logo       : {
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end'
	},
	logoButton : {
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end',
		padding        : 2,
		margin         : 5
	}
});
