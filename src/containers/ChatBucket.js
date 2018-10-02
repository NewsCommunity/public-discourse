import { connect } from 'react-redux';
import { subscribeToDatabase_THUNK, postToDatabase } from '../state/chatRoom/actions';
import { getChatMessages_THUNK, setChatMessages } from '../state/chatRoom';
import ChatBucket from '../components/ChatBox/ChatBucket';
import { firestore} from '../fire';




function mapState(state) {
	console.log('The mapState for ChatBucket is: ', state);
	return {
		//msgArray: state.ChatReducer.messages
	};
}

function mapDispatch(dispatch) {
	return {
		// postMsg: (msg) => dispatch(postMsg(msg)),
		//subscribe: (chatRoomId, limit) => dispatch(subscribeToDatabase_THUNK(chatRoomId, limit))
	};
}

export default connect(mapState, mapDispatch)(ChatBucket)
