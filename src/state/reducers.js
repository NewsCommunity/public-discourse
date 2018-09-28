import { combineReducers } from 'redux';

import {ChatReducer} from './chatRoom/reducers'
import {articleReducer} from './articles/reducers'



export default combineReducers({
articleReducer,
ChatReducer
});
