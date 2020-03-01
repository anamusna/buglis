import React, { Component } from 'react';
import {
	StyleSheet,
	Image,
	Picker,
	TextInput,
	Modal,
	Button,
	Text,
	TouchableHighlight,
	View,
	Alert
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import * as axios from 'axios';

class AddPosts extends Component {
	state = {
		modalVisible : false,
		posts        : [],
		title        : '',
		description  : '',
		genre        : '',
		director     : '',
		image        : null,

		added        : false
	};

	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	/* 	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}; */
	onChangeValue = (key, value) => {
		/* console.log('GGGG', key, value); */
		this.setState({ [key]: value });
	};
	onChangeImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes    : ImagePicker.MediaTypeOptions.All,
			allowsEditing : true,
			aspect        : [ 4, 3 ],
			quality       : 1
		});

		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result.uri });
		}
	};

	onFormSubmit = () => {
		const formData = new FormData();
		formData.append('image', this.state.image);
		formData.append('title', this.state.title);
		formData.append('description', this.state.description);
		formData.append('genre', this.state.genre);
		formData.append('rating', this.state.rating);
		const config = {
			headers : {
				'content-type' : 'multipart/form-data'
			}
		};

		axios
			.post('http://192.168.178.21:3001/api/posts/new', formData, config)
			.then((response) => {
				console.log('add post', response);
				if (response) {
					this.setState({
						posts : response,
						added : true
					});
					return response;
				}
			})
			.catch((error) => {
				console.log(error);
			});
		this.setModalVisible(false);
	};

	render() {
		return (
			<View style={{ marginTop: 22 }}>
				<TouchableHighlight
					style={styles.buttonContainer}
					onPress={() => {
						this.setModalVisible(true);
					}}
				>
					<Text>Add a Post</Text>
				</TouchableHighlight>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View style={{ marginTop: 22 }}>
						<ScrollView>
							<View style={styles.container}>
								<Text style={styles.required}>Complete the form and submit</Text>

								<TextInput
									required
									placeholder="title"
									placeholderStyle={{ paddingLeft: 10 }}
									multiline={true}
									underlineColorAndroid="transparent"
									style={[ styles.textInput ]}
									keyboardType="email-address"
									underlineColorAndroid="transparent"
									underlineColorAndroid="transparent"
									autoCapitalize="none"
									value={this.state.title}
									name="title"
									onChangeText={(value) => this.onChangeValue('title', value)}

									/* 	onChangeText={this.onChange} */
								/>
								<TextInput
									style={styles.textInput}
									placeholder="description"
									placeholderStyle={{ paddingLeft: 10 }}
									keyboardType="email-address"
									underlineColorAndroid="transparent"
									underlineColorAndroid="transparent"
									autoCapitalize="none"
									value={this.state.description}
									onChangeText={(value) => this.onChangeValue('description', value)}
									name="description"
								/>
								<TextInput
									style={styles.textInput}
									placeholder="quality"
									placeholderStyle={{ paddingLeft: 10 }}
									keyboardType="email-address"
									underlineColorAndroid="transparent"
									underlineColorAndroid="transparent"
									autoCapitalize="none"
									value={this.state.genre}
									onChangeText={(value) => this.onChangeValue('genre', value)}
									name="genre"
								/>
								<TextInput
									style={styles.textInput}
									placeholder="Address"
									placeholderStyle={{ paddingLeft: 10 }}
									keyboardType="email-address"
									underlineColorAndroid="transparent"
									underlineColorAndroid="transparent"
									autoCapitalize="none"
									value={this.state.director}
									onChangeText={(value) => this.onChangeValue('director', value)}
									name="director"
								/>

								<View>
									{this.state.image && (
										<Image source={{ uri: this.state.image }} style={{ width: 350, height: 200 }} />
									)}
									<Button title="select a photo" onPress={this.onChangeImage} />
								</View>

								{/* 		<TextInput
									required
									type="file"
									name="image"
									placeholder="url of your image"
									placeholderStyle={{ paddingLeft: 10 }}
									multiline={true}
									underlineColorAndroid="transparent"
									style={[ styles.textInput ]}
									keyboardType="image"
									underlineColorAndroid="transparent"
									underlineColorAndroid="transparent"
									autoCapitalize="none"
									value={this.state.image}
									name="image"
									onChange={this.onChangeImage}

									
								/> */}
								<TouchableHighlight style={styles.buttonContainer} onPress={() => this.onFormSubmit()}>
									<Text>Submit</Text>
								</TouchableHighlight>
							</View>
						</ScrollView>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container       : {
		flex           : 1,
		justifyContent : 'center',
		alignItems     : 'center'
	},
	inputContainer  : {
		borderBottomColor : '#F5FCFF',
		backgroundColor   : '#FFFFFF',
		borderRadius      : 5,
		borderBottomWidth : 1,
		width             : 250,
		height            : 50,
		marginBottom      : 20,
		flexDirection     : 'row',
		alignItems        : 'center'
	},

	buttonContainer : {
		justifyContent : 'center',
		alignItems     : 'center',
		marginBottom   : 20,
		width          : 250,
		margin         : 4,
		padding        : 5,
		borderRadius   : 5,
		borderWidth    : 1,
		borderColor    : '#85c4ea',
		maxHeight      : 100,
		alignSelf      : 'center'
	},
	titles          : {
		textAlign   : 'left',
		alignSelf   : 'flex-start',
		padding     : 8,
		paddingLeft : 20
	},
	required        : {
		fontSize   : 15,
		margin     : 2,
		paddingTop : 10
	},

	textInput       : {
		borderRadius      : 5,
		width             : '90%',
		paddingVertical   : 0,
		paddingHorizontal : 15,
		paddingTop        : 10,
		paddingBottom     : 10,
		height            : 40,
		margin            : 0,
		borderWidth       : 1,
		borderColor       : '#85c4ea',
		backgroundColor   : 'white',
		marginBottom      : 10
	},
	button          : {
		alignSelf : 'center',
		position  : 'relative',
		width     : '100%'
	}
});
export default AddPosts;
