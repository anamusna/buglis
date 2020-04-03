import React, { Component } from 'react';
import {
	View,
	Image,
	Text,
	StyleSheet,
	FlatList,
	TouchableWithoutFeedback,
	TouchableOpacity,
	YellowBox,
	AsyncStorage,
	ScrollView,
	Button
} from 'react-native';
import { connect } from 'react-redux';
import PostCard from './PostCard';
import AddPosts from './AddPosts';
import axios from 'axios';
import { FileSystem } from 'expo';
import { Card, CardItem, Body, Header } from 'native-base';
import { getPosts } from '../../Redux/actions/postAction';
import { api } from '../../api';
import { AntDesign } from '@expo/vector-icons';

YellowBox.ignoreWarnings([ 'Require cycle:' ]);

class PostScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts        : [],

			token        : '',
			loading      : true,
			userLoggedIn : false
		};
	}
	LogoTitle = (navigation) => {
		/* console.log('GGGGGGG profile', navigation); */

		return (
			<TouchableOpacity
				style={styles.logo}
				onPress={() => {
					navigation.navigation.navigate('Profile');
				}}
			>
				<MaterialCommunityIcons color="white" name="account" size={40} />
				{/* 	<Image
					
					style={styles.logoButton}
					source={require('../../assets/logo.png')}
					onPress={() => alert('This is a button!')}
				/> */}
			</TouchableOpacity>
		);
	};

	componentDidMount = async () => {
		await this.props.dispatchGetPosts();
	};

	logout = async () => {
		try {
			await AsyncStorage.removeItem('id_token');
			/* await AsyncStorage.removeItem('avatar'); */
			this.setState({
				token        : null,
				userLoggedIn : false,
				loading      : false
			});
			console.log('token removed');
			this.props.navigation.navigate('Login');
		} catch (err) {
			console.log(`The error is: ${err}`);
		}
	};
	onAddPostPressed = (value) => {
		this.setState({
			posts : this.state.posts.concat(value)
		});
	};

	/* 	onPressedPost = (id) => {
		this.props.navigation.navigate('Details', {
			postId     : id,
			otherParam : 'just somethings'
		});
	}; */
	removePost = (id) => {
		axios.delete('http://192.168.178.21:3001/api/posts/?id=' + id).then((res) => console.log(res));
		this.setState({
			deleted : true
		});
	};

	keyExtractor = (post, index) => post._id;
	/* keyExtractor = (posts, index) => String(posts._id); */

	renderItem = () => {
		/* console.log('AKAKKA', this.keyExtractor) */ return (
			<View>
				<View style={styles.addPost}>
					<AddPosts />
					<Button title="logout" onPress={() => this.logout()} />
				</View>
				{/* <ScrollView> */}
				<View styles={styles.container}>
					<Text>POSTS</Text>
					{this.props.posts.map((post, index) => {
						return (
							<TouchableWithoutFeedback post={post} key={index} removePost={this.removePost}>
								<Card style={styles.card}>
									<CardItem cardBody>
										<View>
											<Image
												source={{
													uri : post.image
												}} /* require('../../assets/bug.jpg') */
												style={{ width: 350, height: 300 }}
											/>
										</View>
									</CardItem>
									<CardItem>
										<Body /* style={{ justifyContent: 'center', alignItems: 'center' }} */>
											<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{post.title}</Text>

											<View style={{ flexDirection: 'row' }}>
												<View style={{ paddingRight: 2, marginRight: 2 }}>
													<Text>{post.director}</Text>
													<Text>{post.description}</Text>
													<Text>{post.genre}</Text>
													<Text onClick={() => this.props.removeEvent(this.props.posts._id)}>
														Delete
													</Text>
													<Text>{post.updated_at}</Text>
												</View>
											</View>
										</Body>
									</CardItem>
								</Card>
							</TouchableWithoutFeedback>
						);
					})}
				</View>
				{/* </ScrollView> */}
			</View>
		);
	};
	render() {
		return (
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={{ flexGrow: 1 }}
					data={this.props.posts}
					keyExtractor={this.keyExtractor}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container    : {
		flex            : 1,
		justifyContent  : 'center',
		alignItems      : 'center',
		backgroundColor : '#ebebeb'
	},
	card         : {
		marginTop         : 10,
		marginBottom      : 10,
		borderWidth       : 1,
		borderRadius      : 2,
		borderColor       : '#ddd',
		borderBottomWidth : 0,
		shadowColor       : '#000',
		shadowOffset      : { width: 0, height: 2 },
		shadowOpacity     : 0.1,
		shadowRadius      : 2
	},
	addPost      : {
		flex            : 1,
		backgroundColor : 'white',
		margin          : 20,
		justifyContent  : 'flex-end',
		alignItems      : 'flex-end'
	},
	servicesList : {
		textAlign : 'left',
		color     : '#0ec485'
	}
});

const mapStateToProps = (state) => {
	const { posts, userLoggedIn, loading, error, post, postLoading } = state.posts;
	/* console.log('Post state', state.posts); */
	return { posts, userLoggedIn, loading, error, post, postLoading };
};

const mapDispatchToProps = {
	dispatchGetPosts : getPosts
};
export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);
