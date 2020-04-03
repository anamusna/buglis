import * as React from 'react';
import { NavigationScreen, ProfilePage, ContentsScreen } from './Navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBarOptions={{
				activeTintColor : '#e91e63'
			}}
		>
			<Tab.Screen
				name="Home"
				component={NavigationScreen}
				options={{
					tabBarLabel : 'Home',
					tabBarIcon  : ({ color, size }) => <AntDesign name="home" color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="Posts"
				component={ContentsScreen}
				options={{
					tabBarLabel : 'Posts',
					tabBarIcon  : ({ color, size }) => <FontAwesome name="search-plus" color={color} size={size} />
				}}
			/>
			{/* 		<Tab.Screen
				name="Profile"
				component={ProfilePage}
				options={{
					tabBarLabel : 'Profile',
					tabBarIcon  : ({ color, size }) => (
						<MaterialCommunityIcons name="account" color={color} size={size} />
					)
				}}
			/> */}
		</Tab.Navigator>
	);
}
