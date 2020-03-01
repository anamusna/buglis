import React, { Component } from 'react';

import PostCard from './PostCard';
import AddPosts from './AddPosts';
import axios from 'axios';

import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts : []
		};
	}

	//get the data

	componentWillMount() {
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
			<View style={{ flex: 1 }}>
				<View className="genres">
					<AddPosts addPostFunction={(value) => this.onAddPostPressed(value)} />
				</View>

				<View className="all-posts-list">
					<Text>POSTS</Text>
					{this.state.posts.map((post, index) => {
						return <PostCard post={post} key={index} removePost={this.removePost} />;
					})}
				</View>
			</View>
		);
	}
}

export default Posts;
