import types from './types';
import { firestore} from '../../fire';

export function setSingleDiscourse(discourse) {
  return {
    type: types.SET_SINGLE_DISCOURSE,
    discourse
  }
}

export function setDiscourseList(discourseList){
  return {
    type: types.SET_DISCOURSE_LIST,
    discourseList
  }
}



//I assume later users will be able to query by discourseList. Here I am
//just leaving query as a possible value to pass for a query. We will
//need to define how we query later. For now it's unused.
export function getArticleList_THUNK(query = 'default'){
  return async (dispatch) => {
    //For reference:
    let discourseList = []

    const articles = await firestore.collection("discourseList")
    // firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
    // .collection("messages")
    // .onSnapshot(function(doc) {
    //   doc.forEach((thing) => {
    //     console.log("THE OBJECT", thing.data());

    //   })
    // })

    firestore.collection("discourseList").get().then(snapshopt => {
      snapshot.forEach(doc => {
        discourseList.push(doc);
      })
    })
    console.log("Discourse LIST is: ", discourseList);
    dispatch(setDiscourseList(discourseList))
  }
}

export function getSingleArticle_THUNK(articleID){
  return async (dispatch) => {
    const discourse //= call to firestore database goes here.

    //For reference:

    // firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
    // .collection("messages")
    // .onSnapshot(function(doc) {
    //   doc.forEach((thing) => {
    //     console.log("THE OBJECT", thing.data());
    //     dispatch(setChatMessages(thing.data()));
    //   })
    // })

    dispatch(setSingleDiscourse);
  }
}

