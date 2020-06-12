import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';

function DetailsScreen({ route, navigation }) {
	const post = route.params.post;
	console.log('POST DETAILS ######', post);
	return (
		<View style={{ flex: 1 }}>
			<Text>Details Screen</Text>
			<View
				style={{
					flexDirection  : 'column',
					justifyContent : 'center',
					alignItems     : 'center'
				}}
			>
				<View>
					<Image
						source={{ uri: post.image }}
						style={{
							width        : 130,
							height       : 130,
							borderRadius : 50,
							margin       : 30
						}}
					/>
				</View>

				<View>
					<Text
						style={{
							fontSize : 22,
							padding  : 3
						}}
					>
						{post.title}
					</Text>
					<Text
						style={{
							fontSize : 14,
							padding  : 3
						}}
					>
						{post.description}
					</Text>
					<Text>{post.genre}</Text>
					<Text>{post._id}</Text>
				</View>
			</View>

			{/* <Button title="open" style={{ width: 20, height: 20 }} onPress={() => navigation.toggleDrawer()} /> */}
			{/* 	<Button
				title="Go to Details... again"
				onPress={() =>
					navigation.push('Details', {
						itemId : Math.floor(Math.random() * 100)
					})}
			/> */}
			{/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
			<Button title="Go back" onPress={() => navigation.goBack()} />
		</View>
	);
}

export default DetailsScreen;
