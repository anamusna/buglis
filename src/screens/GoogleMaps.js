import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class GoogleMapsScreen extends React.Component {
	state = {
		zoom : 12
	};
	onRegionChange(region) {
		this.setState({ region });
	}
	render() {
		return (
			<View style={styles.container}>
				<MapView
					style={styles.mapStyle}
					initialRegion={{
						latitude       : 52.515816,
						longitude      : 13.454293,
						latitudeDelta  : 0.0922,
						longitudeDelta : 0.0421
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		backgroundColor : '#fff',
		alignItems      : 'center',
		justifyContent  : 'center'
	},
	mapStyle  : {
		width  : Dimensions.get('window').width,
		height : Dimensions.get('window').height
	}
});
