import React, { Component } from 'react';
import 'react-native-gesture-handler';
import SearchBox from './SearchBox';
import { AsyncStorage } from 'react-native';
import PostCard from './PostCard';
import AddPosts from './AddPosts';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Modal,
	Button,
	Text,
	TouchableHighlight,
	View,
	Alert,
	SearchBar
} from 'react-native';
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
	componentDidMount = async () => {
		this.props.dispatchGetPosts();
		/* this.props.navigation.setParams({ changeScreen: 0 }); */
		try {
			let tokenStorage = await AsyncStorage.getItem('id_token');
			console.log('TOKEN IN POST', tokenStorage);
			/* let avatar = await AsyncStorage.getItem('avatar'); */

			if (tokenStorage !== null) {
				this.setState(
					{
						token        : tokenStorage,
						userLoggedIn : true
					}
					/* this.changeHeader(true) */
				);
			} /*  else {
				this.changeHeader(false, null);
			} */
		} catch (error) {
			console.log(error);
		}
	};

	/* componentWillReceiveProps = async (nextProps) => {
		let param_1 = this.props.navigation.getParam('changeScreen');
		let param_2 = nextProps.navigation.getParam('changeScreen');
		console.log(param_1, param_2);

		if (param_1 !== param_2) {
			let tokenStorage = await AsyncStorage.getItem('id_token');
			if (tokenStorage !== null) {
				let avatar = await AsyncStorage.getItem('avatar');

				if (avatar.includes('/uploads/')) {
					let avatarPath = api + avatar;
					this.props.dispatchGetPosts();
					this.changeHeader(true, avatarPath, param_2);

					return;
				}

				console.log('avatar NOT includes upload', avatar);
				await this.changeHeader(true, avatar, param_2);
				console.log(param_1, param_2);
			}
		}
	}; */

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
		console.log(id);
		axios.delete('http://192.168.178.21:3001/api/posts/?id=' + id).then((res) => console.log(res));
		this.setState({
			deleted : true
		});
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'white' }}>
				{/* <SearchBox /> */}

				<ScrollView>
					<View style={styles.addPost}>
						<AddPosts />
					</View>

					<View styles={styles.container}>
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
		flex            : 1,
		backgroundColor : 'white'
		/* alignSelf       : 'center',
		justifyContent  : 'center',
		alignItems      : 'center' */
	},
	addPost    : {
		flex            : 1,
		backgroundColor : 'white',
		margin          : 20,
		justifyContent  : 'flex-end',
		alignItems      : 'flex-end'
	},
	menuButton : {
		height : 65,

		margin : 5
	}
});
