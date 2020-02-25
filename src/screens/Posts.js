import React, { Component } from 'react';

import PostCard from './PostCard';
import AddPost from './AddPost';
import axios from 'axios';

import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			events : []
		};
	}

	//get the data

	componentWillMount() {
		axios.get('http://192.168.178.21:3001/api/events/list').then((results) => {
			console.log('events result', results);

			this.setState({ events: results.data });
			console.log('events list', this.state.events);
		});
	}
	onAddEventPressed = (value) => {
		this.setState({
			events : this.state.events.concat(value)
		});
	};

	removeEvent = (id) => {
		console.log(id);
		axios.delete('http://192.168.178.21:3001/api/events/?id=' + id).then((res) => console.log(res));
		this.setState({
			deleted : true
		});
	};

	render() {
		return (
			<View>
				<Text>EVENTS</Text>
				<View className="genres">
					<AddPost addEventFunction={(value) => this.onAddEventPressed(value)} />
				</View>

				<View className="all-events-list">
					{this.state.events.map((event, index) => {
						return <PostCard event={event} key={index} removeEvent={this.removeEvent} />;
					})}
				</View>
			</View>
		);
	}
}

export default Posts;
