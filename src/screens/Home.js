import * as React from 'react';
import { Button, View, Text, TouchableHighlight } from 'react-native';
import GoogleMapsScreen from './GoogleMaps';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<Button title="open" style={{ width: 20, height: 20 }} onPress={() => navigation.toggleDrawer()} />

			<ScrollView>
				<GoogleMapsScreen {...navigation} />
			</ScrollView>
		</View>
	);
}
export default HomeScreen;
