import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import Posts from './src/screens/Posts';
import DetailsScreen from './src/screens/Details';
import GoogleMapsScreen from './src/screens/GoogleMaps';
import CameraPic from './src/screens/CameraPic';
import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login';
import Header from './src/screens/Header';
import { DrawerActions } from '@react-navigation/native';

function LogoTitle() {
	return (
		<Button
			title="open"
			style={{ width: 50, height: 50 }}
			/* source={require('./assets/logo.png')} */

			onPress={() => alert('This is a button!')}
		/>
	);
}
const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

export default function NavigationScreen(props) {
	/* 	console.log('PROPS', props); */
	console.disableYellowBox = true;
	return (
		<HomeStack.Navigator
			initialRouteName="Maps"
			headerMode="null"
			screenOptions={{
				headerRight      : () => <Header {...props} />,
				headerStyle      : {
					backgroundColor : '#f4511e'
				},
				headerTintColor  : '#fff',
				headerTitleStyle : {
					fontWeight : 'bold'
				}
			}}
		>
			<HomeStack.Screen component={GoogleMapsScreen} name="Maps" {...props} />
			<HomeStack.Screen component={HomeScreen} name="Home" {...props} />
			<HomeStack.Screen name="Posts" component={Posts} {...props} />

			<HomeStack.Screen name="CameraPic" component={CameraPic} {...props} />
			<HomeStack.Screen name="Details" component={DetailsScreen} {...props} />
			<HomeStack.Screen name="Login" component={LoginScreen} {...props} />
			<HomeStack.Screen name="SignUp" component={SignUpScreen} {...props} />
		</HomeStack.Navigator>
	);
}
