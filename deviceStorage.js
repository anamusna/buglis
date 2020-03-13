import { AsyncStorage } from 'react-native';

const deviceStorage = {
	async saveItem(key, value) {
		console.log("saving post_____'###", key, value);
		try {
			await AsyncStorage.setItem(key, value);
		} catch (error) {
			console.log('AsyncStorage Error: ' + error.message);
		}
	},
	async deleteItem(key, value) {
		console.log('deleting post____###', key, value);
		try {
			await AsyncStorage.removeItem(key, value);
		} catch (error) {
			console.log('AsyncStorage Error: ' + error.message);
		}
	}
};

export default deviceStorage;
