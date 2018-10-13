import { SET_SINGLE_DISCOURSE, SET_DISCOURSE_LIST } from './types';
import { firestore } from '../../fire';

export function setSingleDiscourse(discourse) {
  return {
    type: SET_SINGLE_DISCOURSE,
    discourse,
  };
}

export function setDiscourseList(discourseList) {
  return {
    type: SET_DISCOURSE_LIST,
    discourseList,
  };
}

export function thunkGetDiscourseList() {
  return async (dispatch) => {
    const discourseList = [];
    const discourseListRef = firestore.collection('discourseList');
    const query = discourseListRef.orderBy("timestamp", "desc").limit(100)
    await query
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const id = doc._key.path.segments[doc._key.path.segments.length - 1];

          let docData = doc.data();
          docData = { ...docData, docId: id };
          if (docData.article) {
            discourseList.push(docData);
          }
        });
      })
      .catch((err) => {
        console.error('ERROR GETTING DOCUMENTS', err);
      });

    dispatch(setDiscourseList(discourseList));
  };
}

export function thunkGetSingleDiscourse(discourseId) {
  return async (dispatch) => {
    const doc = await firestore
      .collection('discourseList')
      .doc(discourseId)
      .get();
    const id = doc._key.path.segments[doc._key.path.segments.length - 1];
    let docData = doc.data();
    docData = { ...docData, docId: id };
    dispatch(setSingleDiscourse(docData));
  };
}
