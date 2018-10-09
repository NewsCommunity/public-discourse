import { SET_SINGLE_DISCOURSE, SET_DISCOURSE_LIST, GET_DISCOURSE_LIST, GET_SINGLE_DISCOURSE } from './types'
import { firestore } from '../../fire'

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

// I assume later users will be able to query by discourseList. Here I am
// just leaving query as a possible value to pass for a query. We will
// need to define how we query later. For now it's unused.
export function thunkGetDiscourseList () {
  return async dispatch => {
    let discourseList = []
    let discourseListRef = firestore.collection('discourseList_2')
    let query = discourseListRef.limit(10)
    await query
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                const id = doc._key.path.segments[doc._key.path.segments.length - 1]
                let docData = doc.data()
                docData = { ...docData, docId: id }
                discourseList.push(docData)
              })
            })
            .catch(err => {
              console.error('ERROR GETTING DOCUMENTS', err)
            })

    dispatch(setDiscourseList(discourseList))
  }
}

export function thunkGetSingleDiscourse (discourseId) {
  return async dispatch => {
    let doc = await firestore.collection('discourseList_2').doc(discourseId).get()
    const id = doc._key.path.segments[doc._key.path.segments.length - 1]
    let docData = doc.data()
    docData = { ...docData, docId: id }
    dispatch(setSingleDiscourse(docData))
  }
}
