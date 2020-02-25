import * as React from 'react';
import { Button, View, Text } from 'react-native';

/* import EventsList from '../Events/EventsList'; */
import AddEvents from './AddEvents';

import axios from 'axios';

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events : []
		};
	}

	componentWillMount() {
		axios.get('http://192.168.178.21:3001/api/events/list').then((results) => {
			console.log('admin', results);

			this.setState({ events: results.data });
			console.log('admin', this.state.events);
		});
	}

	onAddEventPressed = (value) => {
		this.setState({
			events : this.state.events.concat(value)
		});
	};

	//Edit a event

	editEvent = (id) => {
		console.log(id);
		axios.get('http://192.168.178.21:3001/api/events/?id=' + id).then((res) => console.log(res));
		console.log('it works with edit!');
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
				<AddEvents addEventFunction={(value) => this.onAddEventPressed(value)} />
				{/* <EventsList /> */}
			</View>
		);
	}
}

export default Admin;
