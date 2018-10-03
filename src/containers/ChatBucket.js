import { connect } from 'react-redux';
import { thunkSubscribeToDatabase, thunkPostToDatabase } from '../state/chatRoom/actions';
import { thunkGetChatMessages, setChatMessages } from '../state/chatRoom';
import ChatBucket from '../components/ChatBox/ChatBucket';
import { firestore} from '../fire';




function mapState(state) {

	return {
		//msgArray: state.ChatReducer.messages
	};
}

function mapDispatch(dispatch) {
	return {
		// postMessage: (msg) => dispatch(postMessage(msg)),
		//subscribe: (chatRoomId, limit) => dispatch(thunkSubscribeToDatabase(chatRoomId, limit))
	};
}

export default connect(mapState, mapDispatch)(ChatBucket)
