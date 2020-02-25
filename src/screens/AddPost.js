import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';

export default function AddPost() {
	const [ modalVisible, setModalVisible ] = useState(false);
	return (
		<View style={{ marginTop: 22 }}>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View style={styles.container}>
					<View>
						<Text>Complete the form and submit</Text>
						<TextInput
							style={styles.inputs}
							placeholder="testing"
							keyboardType="email-address"
							underlineColorAndroid="transparent"
							autoCapitalize="none"
							/* onChangeText={(email) => this.setState({ email, errors: '' })} */
						/>
						<TouchableHighlight
							style={styles.buttonContainer}
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text>Submit Post</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>

			<TouchableHighlight
				style={styles.buttonContainer}
				onPress={() => {
					setModalVisible(true);
				}}
			>
				<Text>Add a Post</Text>
			</TouchableHighlight>
		</View>
	);
}

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
	}
});
