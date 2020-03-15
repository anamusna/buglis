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
import Menu from './src/screens/Menu';
import Logo from './src/screens/Logo';
/* import { DrawerActions } from '@react-navigation/native'; */

const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

export default function NavigationScreen(props) {
	console.disableYellowBox = true;
	return (
		<HomeStack.Navigator initialRouteName="Maps" headerMode="null">
			<HomeStack.Screen component={GoogleMapsScreen} name="Maps" {...props} />
			{/* <HomeStack.Screen component={HomeScreen} name="Home" {...props} /> */}
			<HomeStack.Screen
				name="Posts"
				component={Posts}
				options={{
					title : 'Awesome app'
				}}
			/>

			<HomeStack.Screen name="CameraPic" component={CameraPic} {...props} />
			<HomeStack.Screen name="Details" component={DetailsScreen} {...props} />
			<HomeStack.Screen name="Login" component={LoginScreen} {...props} />
			<HomeStack.Screen name="Menu" component={Menu} {...props} />
			<HomeStack.Screen name="SignUp" component={SignUpScreen} {...props} />
		</HomeStack.Navigator>
	);
}
