import React from 'react';
import { View } from 'react-native';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import { createStackNavigator } from '@react-navigation/stack';
/* import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' */
const Routes = createStackNavigator(
	{
		Home    : {
			screen : HomeScreen
		},
		Details : {
			screen : DetailsScreen
		}
	},
	{
		initialRouteName  : 'Home',
		navigationOptions : {
			headerTitleStyle : {
				fontWeight : 'bold',
				color      : '#fff'
			},
			headerTintColor  : '#fff'
		}
	}
);

export default Routes;
