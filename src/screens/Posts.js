import React, { Component } from 'react';
import 'react-native-gesture-handler';
import Header from './Header';
import PostCard from './PostCard';
import AddPosts from './AddPosts';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';

class PostsScreen extends Component {
	/*   static navigationOptions = {
    headerShown: false,
  }; */
	constructor(props) {
		super(props);

		this.state = {
			posts : []
		};
	}

	//get the data

	componentDidMount() {
		/* 	console.log('XXXX', this.props); */
		axios.get('http://192.168.178.21:3001/api/posts/list').then((results) => {
			this.setState({ posts: results.data });
			console.log('posts list', this.state.posts);
		});
	}
	onAddPostPressed = (value) => {
		this.setState({
			posts : this.state.posts.concat(value)
		});
	};

	removePost = (id) => {
		console.log(id);
		axios.delete('http://192.168.178.21:3001/api/posts/?id=' + id).then((res) => console.log(res));
		this.setState({
			deleted : true
		});
	};

	render() {
		return (
			<ScrollView>
				<TouchableHighlight>
					<AddPosts addPostFunction={(value) => this.onAddPostPressed(value)} />
				</TouchableHighlight>

				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					<Text>POSTS</Text>
					{this.state.posts.map((post, index) => {
						return <PostCard post={post} key={index} removePost={this.removePost} />;
					})}
				</View>
			</ScrollView>
		);
	}
}

function Posts({ route, navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<TouchableHighlight style={styles.menuButton}>
				<AntDesign
					name="bars"
					size={40}
					color="blue"
					style={{ padding: 2 }}
					onPress={() => navigation.toggleDrawer()}
				/>
			</TouchableHighlight>
			<View styles={styles.container}>
				<PostsScreen />
			</View>
		</View>
	);
}

export default Posts;

const styles = StyleSheet.create({
	container  : {
		flex           : 1,
		/* 		backgroundColor : '#fff', */
		justifyContent : 'center',
		alignItems     : 'center'
	},

	menuButton : {
		height         : 60,
		justifyContent : 'space-between',
		justifyContent : 'flex-end',
		alignItems     : 'flex-end',
		padding        : 2,
		margin         : 5
	}
});
