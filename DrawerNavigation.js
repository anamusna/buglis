import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/Home';
import Posts from './src/screens/Posts';
import DetailsScreen from './src/screens/Details';
import GoogleMapsScreen from './src/screens/GoogleMaps';
import CameraPic from './src/screens/CameraPic';
import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login';
import Menu from './src/screens/Menu';
import NavigationScreen from './Navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
	console.disableYellowBox = true;
	return (
		<NavigationContainer>
			<Drawer.Navigator
				drawerStyle={{
					backgroundColor : '#f2f2f2',
					width           : 250
				}}
			>
				<Drawer.Screen name="Report A Litter" component={NavigationScreen} />
				<Drawer.Screen name="Posts" component={Posts} options={{ drawerLabel: 'Posts Feed' }} />
				<Drawer.Screen name="Login" options={{ drawerLabel: 'Login / Sign Up' }} component={LoginScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
