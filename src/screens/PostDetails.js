import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import SearchBox from './SearchBox';

function PostDetails({ route, navigation }) {
	const { postId } = route.params;
	const { otherParam } = route.params;
	return (
		<View style={{ flex: 1 }}>
			{/* <Button title="open" style={{ width: 20, height: 20 }} onPress={() => navigation.toggleDrawer()} /> */}
			<Text>
				<Text>Post Details Screen</Text>
				<Text>itemId: {postId}</Text>
				<Text>otherParam: {otherParam} </Text>
			</Text>

			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

export default PostDetails;
