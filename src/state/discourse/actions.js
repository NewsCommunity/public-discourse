<<<<<<< HEAD
import { SET_SINGLE_DISCOURSE, SET_DISCOURSE_LIST, GET_DISCOURSE_LIST, GET_SINGLE_DISCOURSE } from './types'
import { firestore } from '../../fire'
=======
import {
	SET_SINGLE_DISCOURSE,
	SET_DISCOURSE_LIST,
	GET_DISCOURSE_LIST,
	GET_SINGLE_DISCOURSE
} from './types';
import { firestore} from '../../fire';
>>>>>>> workingchat

export function setSingleDiscourse (discourse) {
  return {
    type: SET_SINGLE_DISCOURSE,
    discourse
  }
}

export function setDiscourseList (discourseList) {
  return {
    type: SET_DISCOURSE_LIST,
    discourseList
  }
}

<<<<<<< HEAD
// I assume later users will be able to query by discourseList. Here I am
// just leaving query as a possible value to pass for a query. We will
// need to define how we query later. For now it's unused.
export function thunkGetDiscourseList () {
  return async dispatch => {
=======


//I assume later users will be able to query by discourseList. Here I am
//just leaving query as a possible value to pass for a query. We will
//need to define how we query later. For now it's unused.
export function thunkGetDiscourseList(query = 'default'){
  return async (dispatch) => {
    //For reference:
>>>>>>> workingchat
    let discourseList = []
    let discourseListRef = firestore.collection('discourseList')

    let query = discourseListRef.limit(10)
    await query
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                discourseList.push(doc.data())
              })
            })
            .catch(err => {
              console.log('ERROR GETTING DOCUMENTS', err)
            })

<<<<<<< HEAD
=======
    const discourses = await firestore.collection("discourseList")
    // firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
    // .collection("messages")
    // .onSnapshot(function(doc) {
    //   doc.forEach((thing) => {
    //     console.log("THE OBJECT", thing.data());

    //   })
    // })

    firestore.collection("discourseList").get().then(snapshot => {
      snapshot.forEach(doc => {
        discourseList.push(doc);
      })
    })
    console.log("Discourse LIST is: ", discourseList);
>>>>>>> workingchat
    dispatch(setDiscourseList(discourseList))
  }
}

<<<<<<< HEAD
export function thunkGetSingleDiscourse (discourseID) {
  return async dispatch => {
        // For reference:
=======
export function thunkGetSingleDiscourse(discourseID){
  return async (dispatch) => {

    //For reference:
>>>>>>> workingchat

        // firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
        // .collection("messages")
        // .onSnapshot(function(doc) {
        //   doc.forEach((thing) => {
        //     console.log("THE OBJECT", thing.data());
        //     dispatch(setChatMessages(thing.data()));
        //   })
        // })

<<<<<<< HEAD
    dispatch(setSingleDiscourse())
=======
    dispatch(setSingleDiscourse());
>>>>>>> workingchat
  }
}
