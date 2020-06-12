import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';

function SettingsScreen({ route, navigation }) {
	/*  2. Get the param */

	const { itemId } = route.params;
	const { otherParam } = route.params;
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Settings Screen</Text>
			<Text>itemId: {JSON.stringify(itemId)}</Text>
			<Text>otherParam: {JSON.stringify(otherParam)}</Text>

			<Button
				title="Go to Settings... again"
				onPress={() =>
					navigation.push('Settings', {
						itemId : Math.floor(Math.random() * 100)
					})}
			/>

			{/* 	<Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} /> */}
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

export default SettingsScreen;
