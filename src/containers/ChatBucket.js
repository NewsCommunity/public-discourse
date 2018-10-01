import { connect } from 'react-redux';
import { subscribeToDatabase_THUNK, postToDatabase } from '../state/chatRoom/actions';
import { getChatMessages_THUNK, setChatMessages } from '../state/chatRoom';
import ChatBucket from '../components/ChatBox/ChatBucket';
import { firestore} from '../fire';

//This User ID should NOT be user selectable. User should
//**NEVER** be able to post with anything but their logged in user status
//This means there must be a check ***somewhere*** about who the user really is.
// export function postMsg(msg, discourseId = 'nJlBQWLv9YLjHug62z17', userId = 'demoUser') {
// 	return async (dispatch) => {
// 		//There will need to be additional logic to select the Room from discourseId
// 		//Hence for now I will set it to a seperate variable, so it's easy to change
// 		//Once we decide upon what sort of logic is final.
// 		const discourseRoom = 'rooms';
// 		const discourseChat = discourseId;

// 		//The timestamp sholud be set automatically by the database, but for now, if
// 		//incase not:
// 		//As a note: We will need to convert date to local user date.
// 		const timeStamp = new Date();

// 		firestore
// 			.collection('rooms')
// 			.doc(discourseId)
// 			.collection('messages')
// 			.add({
// 				body: msg,
// 				userName: userId,
// 				time: timeStamp
// 			})
// 			.then(function(docRef) {
// 				console.log('Document written with ID: ', docRef.id);
// 			})
// 			.catch(function(error) {
// 				console.error('Error adding document: ', error);
// 			});
// 	};
// }

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

export default connect(mapState, mapDispatch)(ChatBucket);
