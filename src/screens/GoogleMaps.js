import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import { ScrollView } from 'react-native-gesture-handler';
import SearchBox from './SearchBox';

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

	render() {
		return (
			<View style={styles.container}>
				{/* <SearchBox {...this.props} /> */}

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
				<TouchableOpacity
					style={styles.litterButton}
					onPress={() => this.props.navigation.navigate('CameraPic')}
				>
					<Ionicons name="md-add-circle" size={60} color="skyblue" />
				</TouchableOpacity>
			</View>
		);
	}
}

export default GoogleMapsScreen;

const styles = StyleSheet.create({
	container    : {
		flex            : 1,
		backgroundColor : 'transparent'
		/* justifyContent  : 'center',
		alignItems      : 'center',
		zIndex          : 9 */
	},
	mapContainer : {
		/* 	flex            : 1,
		backgroundColor : '#fff',
		justifyContent  : 'center',
		alignItems      : 'center', */
		zIndex : 1
	},
	mapStyle     : {
		width  : Dimensions.get('window').width,
		height : Dimensions.get('window').height,
		zIndex : -9
	},
	marker       : {
		width  : 90,
		height : 100
	},

	litterButton : {
		justifyContent  : 'center',
		alignItems      : 'center',
		width           : 100,
		margin          : 5,
		backgroundColor : 'transparent',
		height          : 60,
		position        : 'absolute',
		bottom          : 10,
		borderRadius    : 25,
		borderWidth     : 1,
		borderColor     : 'transparent',
		alignSelf       : 'center',
		zIndex          : 999
	},
	marker       : {
		margin : 5
	}
});
