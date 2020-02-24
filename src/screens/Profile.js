import * as React from 'react';
import { Button, View, Text } from 'react-native';

function ProfileScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Profile Screen page</Text>
			<Button
				title="Go to Login screen"
				onPress={() => {
					/* 1. Navigate to the Profile route with params */
					navigation.navigate('Login', {
						itemId     : 22,
						otherParam : 'okay i can give anything i want here for login page'
					});
				}}
			/>
			<Button
				title="Go to SignUp screen"
				onPress={() => {
					/* 1. Navigate to the Profile route with params */
					navigation.navigate('SignUp', {
						itemId     : 22,
						otherParam : 'okay i can give anything i want here for signup page'
					});
				}}
			/>
			{/* change the header name/title */}
			{/* <Button title="Update the title" onPress={() => navigation.setOptions({ title: 'Updated!' })} /> */}
		</View>
	);
}
export default ProfileScreen;
