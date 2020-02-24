import * as React from 'react';
import { Button, View, Text } from 'react-native';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen page</Text>
			<Button
				title="Go to Details screen"
				onPress={() => {
					/* 1. Navigate to the Details route with params */
					navigation.navigate('Details', {
						itemId     : 86,
						otherParam : 'anything you want here for details page'
					});
				}}
			/>
			<Button title="Go to Maps" onPress={() => navigation.navigate('Maps')} />
			{/* change the header name/title */}
			{/* <Button title="Update the title" onPress={() => navigation.setOptions({ title: 'Updated!' })} /> */}
		</View>
	);
}
export default HomeScreen;
