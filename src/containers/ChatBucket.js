import { connect } from 'react-redux'
import { subscribeToDatabase_THUNK, postToDatabase } from '../state/chatRoom/actions'
import ChatBucket from '../components/ChatBox/ChatBucket'

function mapState (state) {
  return {
    msgArray: state.ChatReducer.messages
  }
}

function mapDispatch (dispatch) {
  return {
    postMsg: msg => dispatch(postToDatabase(msg)),
    subscribe: (chatRoomId, limit) => dispatch(subscribeToDatabase_THUNK(chatRoomId, limit))
  }
}

export default connect(mapState, mapDispatch)(ChatBucket)
