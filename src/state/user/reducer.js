import firebase from "firebase";

//TYPES======================================================================
const SET_USER = "SET_USER";

//ACTIONS====================================================================
const actionSetUser = (userObj, isLoggedIn) => {
  return {
    type: SET_USER,
    user: userObj,
    isLoggedIn
  };
};

//THUNKS=====================================================================
const googleProvider = new firebase.auth.GoogleAuthProvider();

export const thunkLogInUser = (provider = googleProvider) => async (dispatch) => {

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const { displayName, email, } = user
      dispatch(actionSetUser({displayName, email}, true))
    } else {
      console.log("No user logged in");
    }
  });

  firebase.auth().signInWithPopup(provider);
};

export const thunkLogOutUser = () => async (dispatch) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(actionSetUser({}, false));
    });
};

//REDUCER=====================================================================
const initialState = {
  user: {},
  isLoggedIn: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn
      };
    default:
      return state;
  }
}
