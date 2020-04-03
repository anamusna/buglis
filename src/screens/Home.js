import * as React from 'react';
import { Button, View, Text, TouchableHighlight } from 'react-native';
import GoogleMapsScreen from './GoogleMaps';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => {
					/* 1. Navigate to the Details route with params */
					navigation.navigate('Details', {
						itemId     : 86,
						otherParam : 'anything you want here'
					});
				}}
			/>
		</View>
	);
}
export default HomeScreen;
