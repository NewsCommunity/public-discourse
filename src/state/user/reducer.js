import firebase from "firebase";

//TYPES======================================================================
const SET_USER = "SET_USER";


//ACTIONS====================================================================
const actionSetUser = (userObj, isLoggedIn) => {
  return {
    type: SET_USER,
		user: userObj,
		isLoggedIn,
  };
};


//THUNKS=====================================================================
const googleProvider = new firebase.auth.GoogleAuthProvider()

export const thunkLogInUser = (provider = googleProvider) => async (dispatch) => {
    firebase.auth().signInWithRedirect(provider);

    firebase
      .auth()
      .getRedirectResult()
      .then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log("This is the Token: ", token);
          // ...
        }
        // The signed-in user info.
				var user = result.user;
				dispatch(actionSetUser(user, true))
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
				// ...
				dispatch(actionSetUser({}, false))
			});
  };


export const thunkLogOutUser = () => async (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
				dispatch(actionSetUser({}, false))
      });
}

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
				isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
}
