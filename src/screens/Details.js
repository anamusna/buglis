import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import SearchBox from './SearchBox';

function DetailsScreen({ route, navigation }) {
	/*  2. Get the param */

	const { postId } = route.params;
	const { otherParam } = route.params;
	return (
		<View style={{ flex: 1 }}>
			<Text>
				<Text>Details Screen</Text>
				<Text>itemId: {postId}</Text>
				<Text>otherParam: {otherParam} </Text>
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
