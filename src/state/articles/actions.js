import types from './types';
import { firestore} from '../../fire';

export function setSingleArticle(article) {
  return {
    type: types.SET_SINGLE_ARTICLE,
    article
  }
}

export function setArticleList(articleList){
  return {
    type: types.SET_ARTICLE_LIST,
    articleList
  }
}



//I assume later users will be able to query by articles. Here I am
//just leaving query as a possible value to pass for a query. We will
//need to define how we query later. For now it's unused.
export function getArticleList_THUNK(query = 'default'){
  return async (dispatch) => {
    const articles //= call to firestore database goes here.

    //For reference:

    // firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
    // .collection("messages")
    // .onSnapshot(function(doc) {
    //   doc.forEach((thing) => {
    //     console.log("THE OBJECT", thing.data());
    //     dispatch(setChatMessages(thing.data()));
    //   })
    // })

    dispatch(setArticleList(articles))
  }
}

export function getSingleArticle_THUNK(articleID){
  return async (dispatch) => {
    const article //= call to firestore database goes here.

    //For reference:

    // firestore.collection("rooms").doc('nJlBQWLv9YLjHug62z17')
    // .collection("messages")
    // .onSnapshot(function(doc) {
    //   doc.forEach((thing) => {
    //     console.log("THE OBJECT", thing.data());
    //     dispatch(setChatMessages(thing.data()));
    //   })
    // })

    dispatch(setSingleArticle);
  }
}

