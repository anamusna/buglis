import { combineReducers } from 'redux';
import posts from './postReducer';
import users from './userReducer';

export default (appReducer = combineReducers({
	posts,
	users
}));
