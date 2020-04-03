import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/reducers';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';

export default function App() {
	const store = createStore(rootReducer, applyMiddleware(thunk));
	console.disableYellowBox = true;
	return (
		<Provider store={store}>
			<NavigationContainer>
				<TabNavigation />
			</NavigationContainer>
		</Provider>
	);
}
