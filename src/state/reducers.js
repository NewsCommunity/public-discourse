import { combineReducers } from 'redux';

import { ChatReducer } from './chatRoom/reducers';
import { discourseReducer } from './discourse/reducers';

export default combineReducers({
	discourseReducer,
	ChatReducer
});
