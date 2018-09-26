import { connect } from 'react-redux';

import { getChatMessages_THUNK, setChatMessages } from '../state/chatRoom';

import ChatBucket from '../components/ChatBox/ChatBucket';

function mapState(state) {
	console.log('The mapState for ChatBucket is: ', state);
	return {
		msgArray: state.ChatReducer.messages
	};
}

function mapDispatch(dispatch) {
	return {
		postMsg: () => dispatch(getChatMessages_THUNK())
	};
}

export default connect(mapState, mapDispatch)(ChatBucket);
