import { combineReducers } from 'redux';

import { ChatReducer } from './chatRoom/reducers';
import { articleReducer } from './discourseList/reducers';

export default combineReducers({
	articleReducer,
	ChatReducer
});
