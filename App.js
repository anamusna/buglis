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
import Header from './src/screens/Header';
import NavigationScreen from './Navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
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
				{/* 	<Drawer.Screen component={GoogleMapsScreen} name="Maps" /> */}
				{/* <Drawer.Screen component={HomeScreen} name="Home" /> */}

				{/* <Drawer.Screen name="CameraPic" component={CameraPic} />
				<Drawer.Screen name="Details" component={DetailsScreen} /> */}
				<Drawer.Screen name="Login" component={LoginScreen} />
				<Drawer.Screen name="SignUp" component={SignUpScreen} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
