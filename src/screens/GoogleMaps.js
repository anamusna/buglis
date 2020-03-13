import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import Menu from './Menu';

class GoogleMapsScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			markers : [
				{
					coordinate  : {
						latitude  : 52.515816,
						longitude : 13.454293
					},
					title       : 'Buglis',
					description : 'Cleaning up'
				}
			]
		};
	}

	componentDidMount() {
		this.setState((state) => {
			state.markers[0].coordinate.latitude;
			state.markers[0].coordinate.longitude;
			return state;
		});
	}

	render(navigation) {
		return (
			<View style={styles.container}>
				<TouchableHighlight style={styles.menuButton}>
					<Menu {...this.props} />
				</TouchableHighlight>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => this.props.navigation.navigate('CameraPic')}
				>
					<Text style={{ color: 'red', padding: 2 }}>REPORT A LITTER</Text>
				</TouchableOpacity>
				<ScrollView style={styles.mapContainer}>
					<MapView
						onRegionChangeComplete={(region) => {
							this.setState({ currentView: region });
						}}
						style={styles.mapStyle}
						initialRegion={{
							latitude       : 52.515816,
							longitude      : 13.454293,
							latitudeDelta  : 0.1,
							longitudeDelta : 0.1
						}}
					>
						{this.state.markers.map((marker, i) => {
							return (
								<Marker
									style={styles.marker}
									key={i}
									coordinate={marker.coordinate}
									title={marker.title}
									description={marker.description}
								/>
							);
						})}
					</MapView>
				</ScrollView>
			</View>
		);
	}
}

export default GoogleMapsScreen;

const styles = StyleSheet.create({
	container       : {
		flex : 1
		/* backgroundColor : 'transparent' */
		/* justifyContent  : 'center',
		alignItems      : 'center',
		zIndex          : 9 */
	},
	mapContainer    : {
		/* 	flex            : 1,
		backgroundColor : '#fff',
		justifyContent  : 'center',
		alignItems      : 'center', */
		zIndex : 1
	},
	mapStyle        : {
		width  : Dimensions.get('window').width,
		height : Dimensions.get('window').height,
		zIndex : -9
	},
	marker          : {
		width  : 90,
		height : 100
	},
	menuButton      : {
		height         : 60,
		/* position       : 'absolute', */
		/* right          : 5, */
		/* backgroundColor : 'gray', */
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end',
		padding        : 2,
		/* 	width          : 300, */
		margin         : 5
	},
	buttonContainer : {
		justifyContent  : 'center',
		alignItems      : 'center',

		width           : 300,
		margin          : 5,
		borderRadius    : 50,
		backgroundColor : '#FFFFFF',
		height          : 50,
		position        : 'absolute',
		/* flexDirection   : 'row', */
		bottom          : 0,
		justifyContent  : 'space-between',

		/* padding         : 5, */
		borderRadius    : 5,
		borderWidth     : 1,
		borderColor     : '#85c4ea',
		maxHeight       : 100,
		alignSelf       : 'center',
		zIndex          : 999
	},
	marker          : {
		margin : 5
	}
});
