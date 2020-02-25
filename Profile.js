import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';

function ProfileScreen({ route, navigation }) {
	/* 2. Get the param */
	/* const { itemId } = route.params;
	const { otherParam } = route.params; */
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Profile Screen</Text>
			{/* 	<Text>itemId: {JSON.stringify(itemId)}</Text>
			<Text>otherParam: {JSON.stringify(otherParam)}</Text> */}
			{/* 	<Button
				title="Go to Profile... again"
				onPress={() =>
					navigation.push('Profile', {
						itemId : Math.floor(Math.random() * 100)
					})}
			/>*/}
			<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

export default ProfileScreen;