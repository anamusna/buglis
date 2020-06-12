import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import ProfileScreen from './src/screens/Profile';
import Posts from './src/screens/Posts';
import PostCard from './src/screens/PostCard';
import DetailsScreen from './src/screens/Details';
import GoogleMapsScreen from './src/screens/GoogleMaps';
import CameraPic from './src/screens/CameraPic';
import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login';
import SearchBox from './src/screens/SearchBox';
import Logo from './src/screens/Logo';
/* import { DrawerActions } from '@react-navigation/native'; */

const postStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();

export function NavigationScreen(props) {
	console.disableYellowBox = true;
	return (
		<HomeStack.Navigator initialRouteName="Maps" headerMode="null">
			<HomeStack.Screen component={GoogleMapsScreen} name="Maps" {...props} />

			<HomeStack.Screen name="CameraPic" component={CameraPic} {...props} />
			<ProfileStack.Screen name="Profile" component={ProfileScreen} />
		</HomeStack.Navigator>
	);
}

export function ContentsScreen(props) {
	console.disableYellowBox = true;
	return (
		<postStack.Navigator initialRouteName="Login">
			<postStack.Screen
				name="Posts"
				/* search={SearchBox} */
				component={Posts}
				/* options={({ route }) => ({ title: route.params.title })} */
				options={{
					headerRight : () => <Logo {...props} />,
					headerLeft  : () => <SearchBox {...props} />
				}}
			/>
			<ProfileStack.Screen name="Profile" component={ProfileScreen} />
			<ProfileStack.Screen name="Login" component={LoginScreen} />
			<ProfileStack.Screen name="SignUp" component={SignUpScreen} {...props} />
			<postStack.Screen name="Card" component={PostCard} {...props} />
			<postStack.Screen name="Details" component={DetailsScreen} {...props} />
			<postStack.Screen name="SearchBox" component={SearchBox} {...props} />
		</postStack.Navigator>
	);
}
export function ProfilePage(props) {
	console.disableYellowBox = true;
	return (
		<ProfileStack.Navigator
			initialRouteName="Login"
			screenOptions={{
				/* headerLeft       : () => <SearchBox {...props} />, */
				headerRight      : () => <Logo {...props} />,
				headerStyle      : {
					backgroundColor : 'white'
				},
				headerTintColor  : 'skyblue',
				headerTitleStyle : {
					fontWeight : 'bold'
				}
			}}
		>
			<postStack.Screen name="Posts" component={Posts} />
			<ProfileStack.Screen name="Profile" component={ProfileScreen} />
			<ProfileStack.Screen name="Login" component={LoginScreen} />
			<ProfileStack.Screen name="SignUp" component={SignUpScreen} {...props} />
			<postStack.Screen name="Card" component={PostCard} {...props} />
			<postStack.Screen name="Details" component={DetailsScreen} {...props} />
			<postStack.Screen name="SearchBox" component={SearchBox} {...props} />
		</ProfileStack.Navigator>
	);
}
