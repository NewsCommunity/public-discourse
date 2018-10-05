import firebase from "firebase";

//TYPES======================================================================
const SET_USER = "SET_USER";

const SET_ETH_CONNECTION = "SET_ETH_CONNECTION";
const SET_ACCOUNTS = "SET_ACCOUNTS";
const SET_CURRENT_BALANCE = "SET_CURRENT_BALANCE";
const SET_CURRENT_ACCOUNT = "SET_CURRENT_ACCOUNT";
const FETCH_ETH_CONNECTION = "FETCH_ETH_CONNECTION";


//ACTIONS====================================================================
const actionSetUser = (userObj, isLoggedIn) => {
  return {
    type: SET_USER,
    user: userObj,
    isLoggedIn
  };
};

const actionFetchEth = (fetch) => {
  return {
    type: FETCH_ETH_CONNECTION,
    fetch
  }
}

const actionSetEthAccounts = (accounts) => {
  return {
    type: SET_ACCOUNTS,
    ethAccounts
  }
}

const actionSetCurrentAccount = (account) => {
  return {
    type: SET_CURRENT_ACCOUNT,
    account
  }
}

const 

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
  isLoggedIn: false,
  isFetchingEth: false,
  ethAccounts: [],
  currentEthAccount: '',
  currentEthBalance: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn
      };
      case FETCH_ETH_CONNECTION:
      return {
        ...state,
        isFetchingEth: action.fetch
      }
      case SET_ACCOUNTS:
      return {
        ...state,
        ethAccounts: action.ethAccounts
      }
      case SET_CURRENT_ACCOUNT:
      return {
        ...state,
        currentEthAccount: action.account
      }
    default:
      return state;
  }
}
