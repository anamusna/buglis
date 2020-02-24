import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import GoogleMapsScreen from './src/screens/GoogleMaps';
/* import ProfileScreen from './src/screens/Profile'; */
import SignUpScreen from './src/screens/SignUp';
import LoginScreen from './src/screens/Login';

function LogoTitle() {
	return (
		<Image
			style={{ width: 50, height: 50 }}
			source={require('./assets/logo.png')}
			onPress={() => alert('This is a button!')}
		/>
	);
}
const Tab = createBottomTabNavigator();
const SettingsStack = createStackNavigator();
const HomeStack = createStackNavigator();

export default function App() {
	console.disableYellowBox = true;
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Tab 1">
					{() => (
						<HomeStack.Navigator
							screenOptions={{
								headerRight      : (props) => <LogoTitle {...props} />,
								/* headerRight      : () => (
									<Button onPress={() => alert('This is a button!')} title="Info" color="green" />
								), */
								headerStyle      : {
									backgroundColor : '#f4511e'
								},
								headerTintColor  : '#fff',
								headerTitleStyle : {
									fontWeight : 'bold'
								}
							}}
						>
							<HomeStack.Screen component={HomeScreen} name="Home" />
							<HomeStack.Screen component={GoogleMapsScreen} name="Maps" />
							<HomeStack.Screen name="Details" component={DetailsScreen} />
						</HomeStack.Navigator>
					)}
				</Tab.Screen>
				<Tab.Screen name="Tab 2">
					{() => (
						<SettingsStack.Navigator
							screenOptions={{
								headerRight      : (props) => <LogoTitle {...props} />,
								headerStyle      : {
									backgroundColor : '#333'
								},
								headerTintColor  : '#fff',
								headerTitleStyle : {
									fontWeight : 'bold'
								}
							}}
						>
							{/* <SettingsStack.Screen name="Profile" component={ProfileScreen} /> */}
							<SettingsStack.Screen name="Login" component={LoginScreen} />
							<SettingsStack.Screen name="SignUp" component={SignUpScreen} />
						</SettingsStack.Navigator>
					)}
				</Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
