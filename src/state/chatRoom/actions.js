import types from './types'
import { firestore } from '../../fire'

// ACTION CREATORS==============================================================
export function setChatMessages (messages) {
  return {
    type: types.SET_CHAT_MESSAGES,
    messages
  }
}

const demoData = { text: '', id: '-LNMaYZP70GirAaotNzF' }

// THUNKS=======================================================================
export function thunkGetChatMessages (discourseId) {
  return async dispatch => {
    const demoMess = [demoData]
    dispatch(setChatMessages(demoMess))
  }
}

export function thunkSubscribeToDatabase (discourseId, limit = 100) {
  return async dispatch => {
    firestore.collection('discourseList_2').doc(discourseId).collection('messages').onSnapshot(function (doc) {
      doc.forEach(doc => {
        dispatch(setChatMessages(doc.data()))
      })
    })
  }
}

// export function thunkPostToDatabase (message, discourseId, user = 'demoUser') {
//   return async dispatch => {
//     firestore
//             .collection('discourseList')
//             .doc(discourseId)
//             .collection('messages')
//             .add({
//               body: message,
//               userName: user,
//             })
//             .then(function (docRef) {

//             })
//             .catch(function (error) {
//               console.error('Error adding document: ', error)
//             })
//   }
// }
