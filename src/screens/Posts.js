import React, { Component } from 'react';
import 'react-native-gesture-handler';
import Menu from './Menu';
import PostCard from './PostCard';
import AddPosts from './AddPosts';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TextInput, Modal, Button, Text, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { getPosts } from '../../Redux/actions/postAction';

class Posts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts : []
		};
	}

	//get the data

	componentDidMount() {
		this.props.dispatchGetPosts();
		/* this.props.navigation.setParams({
			headerRight : 'helloooooo'
		}); */
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
				<TouchableHighlight style={styles.menuButton}>
					<Menu {...this.props} />
				</TouchableHighlight>
				<ScrollView styles={styles.container}>
					<TouchableHighlight>
						<AddPosts addPostFunction={(value) => this.onAddPostPressed(value)} />
					</TouchableHighlight>

					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<Text>POSTS</Text>
						{this.props.posts.map((post, index) => {
							return <PostCard post={post} key={index} removePost={this.removePost} />;
						})}
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	const { posts, userLoggedIn, loading, error, post, postLoading } = state.posts;

	return { posts, userLoggedIn, loading, error, post, postLoading };
};

const mapDispatchToProps = {
	dispatchGetPosts : getPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);

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
