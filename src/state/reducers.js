import { combineReducers } from 'redux'
import {userReducer} from './user/reducer.js'
import { ChatReducer } from './chatRoom/reducers'
import { discourseReducer } from './discourse/reducers'

export default combineReducers({
  discourseReducer,
  ChatReducer,
  userReducer
})
