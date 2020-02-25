import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

export default class GoogleMapsScreen extends Component {
	constructor() {
		super();
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
		// console.log(this.props.lat, this.props.lon)
		this.setState((state) => {
			state.markers[0].coordinate.latitude;
			state.markers[0].coordinate.longitude;
			return state;
		});
	}

	render() {
		return (
			<View style={styles.container}>
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
							>
								{/* <MapView.Callout
                                    style={styles.callout}
                                    title={marker.title}
                                >
                                    <Callout>
                                     <Image source={require('../../assets/logo/logo')} />
                                    </Callout>
                                </MapView.Callout> */}
							</Marker>
						);
					})}
				</MapView>
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
	},
	marker    : {
		width  : 90,
		height : 100
	}
});
