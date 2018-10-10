import { SET_SINGLE_DISCOURSE, SET_DISCOURSE_LIST } from "./types";
import { firestore } from "../../fire";
import { store } from "../store";

export function setSingleDiscourse(discourse) {
  return {
    type: SET_SINGLE_DISCOURSE,
    discourse
  };
}

export function setDiscourseList(discourseList, discourseIds) {
  return {
    type: SET_DISCOURSE_LIST,
    discourseList,
    discourseIds,
  };
}

// I assume later users will be able to query by discourseList. Here I am
// just leaving query as a possible value to pass for a query. We will
// need to define how we query later. For now it's unused.
export function thunkGetDiscourseList() {
  return async (dispatch) => {
    let discourseList = [];
    let discourseIds = {};
    let discourseListRef = firestore.collection("discourseList");
    let query = discourseListRef.limit(100);
    await query
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const id = doc._key.path.segments[doc._key.path.segments.length - 1];
          let docData = doc.data();
          docData = { ...docData, docId: id };
          if (docData.article) {
            discourseList.push(docData);
            discourseIds[id] = discourseList.length - 1;
          }
        });
      })
      .catch((err) => {
        console.error("ERROR GETTING DOCUMENTS", err);
      });

    dispatch(setDiscourseList(discourseList, discourseIds));
  };
}

export function thunkGetSingleDiscourse(discourseId) {
  return async (dispatch) => {
    const {discourseList, discourseIds} = store.getState().discourseReducer
    const discourse = discourseList[discourseIds[discourseId]]
    dispatch(setSingleDiscourse(discourse));
  };
}
