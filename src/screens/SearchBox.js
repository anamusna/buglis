import * as React from 'react';
import 'react-native-gesture-handler';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';

export default class SearchBox extends React.Component {
	state = {
		searchInput : ''
	};
	updateSearch = (searchInput) => {
		/* 	console.log('search bar', searchInput); */
		this.setState({ searchInput });
	};

	render() {
		const { searchInput } = this.state;
		return (
			<View style={styles.searchBox}>
				<Searchbar
					style={styles.textInput}
					placeholder="Search"
					onChangeText={(query) => {
						this.setState({ searchInput: query });
					}}
					value={searchInput}
					onChangeText={this.updateSearch}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	searchBox : {
		alignItems    : 'center',
		/* 	backgroundColor : 'red',
		borderRadius    : 50, */
		flex          : 1,
		flexDirection : 'row'
	},
	textInput : {
		/* backgroundColor   : 'red', */
		alignItems        : 'center',
		borderRadius      : 50,
		color             : '#8E8E93',
		flexDirection     : 'row',
		fontSize          : 12,
		width             : 250,
		height            : 30,
		margin            : 8,
		marginVertical    : 10,
		paddingHorizontal : 10
	}
});
