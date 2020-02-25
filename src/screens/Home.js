import * as React from 'react';
import { Button, View, Text, TouchableHighlight } from 'react-native';
import Posts from './Posts';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView>
				<Text>Home page</Text>
				<Posts />
				<TouchableHighlight>
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
				</TouchableHighlight>

				<TouchableHighlight>
					<Button title="Report a litter" onPress={() => navigation.navigate('Maps')} />
				</TouchableHighlight>

				{/* change the header name/title */}
				{/* <Button title="Update the title" onPress={() => navigation.setOptions({ title: 'Updated!' })} /> */}
			</ScrollView>
		</View>
	);
}
export default HomeScreen;
