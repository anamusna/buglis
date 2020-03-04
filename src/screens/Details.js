import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Header from './Header';

function DetailsScreen({ route, navigation }) {
	/*  2. Get the param */

	/* const { itemId } = route.params;
	const { otherParam } = route.params; */
	return (
		<View style={{ flex: 1 }}>
			<Button title="open" style={{ width: 20, height: 20 }} onPress={() => navigation.toggleDrawer()} />
			<Text>
				<Text>Details Screen</Text>
				<Text>itemId: </Text>
				<Text>otherParam: </Text>
			</Text>
			{/* 	<Button
				title="Go to Details... again"
				onPress={() =>
					navigation.push('Details', {
						itemId : Math.floor(Math.random() * 100)
					})}
			/> */}
			{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

export default DetailsScreen;
