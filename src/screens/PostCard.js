import * as React from 'react';
import {
	View,
	Image,
	Text,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	TouchableOpacity,
	YellowBox,
	AsyncStorage
} from 'react-native';
import { Card, CardItem, Body, Header } from 'native-base';
/* import { Card } from 'react-native-paper'; */

export default class PostCard extends React.Component {
	render() {
		return (
			<TouchableWithoutFeedback
			/* onPress={() => this.props.navigation.navigate('Profile', { id: post._id })} */
			>
				<Card style={{ marginTop: 10 }}>
					<CardItem cardBody>
						<View>
							<Image source={require('../../assets/bug.jpg')} style={{ width: 350, height: 300 }} />
						</View>
					</CardItem>
					<CardItem>
						<Body style={{ justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold' }}>{this.props.event.title}</Text>

							<View style={{ flexDirection: 'row' }}>
								<View style={{ paddingRight: 2, marginRight: 2 }}>
									<Text style={styles.servicesList}>{this.props.event.director}</Text>
									<Text style={styles.servicesList}>{this.props.event.description}</Text>
									<Text style={styles.servicesList}>{this.props.event.genre}</Text>
									<Text onClick={() => this.props.removeEvent(this.props.event._id)}>Delete</Text>
									<Text style={styles.servicesList}>{this.props.event.updated_at}</Text>
								</View>
							</View>
						</Body>
					</CardItem>
				</Card>
			</TouchableWithoutFeedback>
		);
	}
}

const styles = StyleSheet.create({
	container : {
		flex            : 1,
		justifyContent  : 'center',
		paddingTop      : 30,
		backgroundColor : '#ecf0f1',
		padding         : 8
	},
	paragraph : {
		margin     : 24,
		fontSize   : 18,
		fontWeight : 'bold',
		textAlign  : 'center'
	}
});
