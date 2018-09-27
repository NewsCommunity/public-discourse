import types from './types';
import { firestore} from '../../fire';

export function setChatMessages(messages) {
	return {
		type: types.SET_CHAT_MESSAGES,
		messages
	};
}


const demoData = {text: "", id: "-LNMaYZP70GirAaotNzF"}

export function getChatMessages_THUNK(articleId = 'messages'){
  return async (dispatch) => {
    const demoMess = [demoData];
    dispatch(setChatMessages(demoMess))
  }
}

//I am defining this outside of the function so that when we recall the
//subscribeToDatabase we are sure to overright the previous instance
//of messages. This might solve our unsubcribe needs.
let messagesRef;

export function subscribeToDatabase_THUNK(databaseId = 'messages', limit=100){
  return async (dispatch) => {

    firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
    .collection("messages")
    .onSnapshot(function(doc) {
      doc.forEach((thing) => {
        console.log("THE OBJECT", thing.data());
        dispatch(setChatMessages(thing.data()));
      })
    })
  }
}

export function postToDatabase(message, databaseId = 'messages', user = 'demoUser'){
  return async (dispatch) => {

      firestore.collection("rooms")
      .doc('nJlBQWLv9YLjHug62z17')
      .collection('messages').add({
      body: message,
      userName: user
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });

  }
}
