import * as React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/reducers';
import thunk from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';

import DrawerNavigation from './DrawerNavigation';

export default function App() {
	const store = createStore(rootReducer, applyMiddleware(thunk));
	console.disableYellowBox = true;
	return (
		<Provider store={store}>
			<DrawerNavigation />
		</Provider>
	);
}
