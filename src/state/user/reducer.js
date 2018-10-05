import firebase from "firebase";
import Eth from 'ethjs';

//TYPES======================================================================
const SET_USER = "SET_USER";

const SET_ETH_PROVIDER = "SET_ETH_PROVIDER";
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

export const actionFetchEth = (fetch) => {
  return {
    type: FETCH_ETH_CONNECTION,
    fetch
  }
}

export const actionSetEthAccounts = (ethAccounts) => {
  return {
    type: SET_ACCOUNTS,
    ethAccounts
  }
}

export const actionSetCurrentAccount = (account) => {
  return {
    type: SET_CURRENT_ACCOUNT,
    account
  }
}

export const actionSetCurrentBalance = (balance) => {
  return {
    type: SET_CURRENT_BALANCE,
    balance
  }
}

export const actionSetEthProviderOnState = (ethProvider) => {
  return {
    type: SET_ETH_PROVIDER,
    ethProvider
  }
}

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

export const thunkSetEthProdiver = () => async (dispatch) => {

  dispatch(actionFetchEth(true));
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
		// We are in the browser and metamask is running.
    let eth = new Eth(window.web3.currentProvider);
    console.log("THE ETH IS:", eth);
    const accounts = await eth.accounts();
    console.log("The accounts:", accounts)

    dispatch(actionSetEthAccounts(accounts));
    dispatch(actionSetCurrentAccount(accounts[0]));
    dispatch(thunkGetEthBalance(accounts[0], eth));
    dispatch(actionSetEthProviderOnState(eth));
    dispatch(actionFetchEth(false));

	} else {
		// We are on the server *OR* the user is not running metamask
		//In this case we aren't connecting to a remote, we need metamask. So this is disconnected and user is warned.
		// const provider = new Web3.providers.HttpProvider('http://loalhost:7545');
		// web3 = new Eth(provider);

    let eth = undefined;
    dispatch(actionSetEthProviderOnState(eth));
	}
}

export const thunkGetEthBalance = (account, eth) => async (dispatch) => {

    const balance = await eth.getBalance(account);
    dispatch(actionSetCurrentBalance(balance))

}

export const thunkSetNewAccount = (account, eth) =>
async (dispatch) => {

  const balance = await eth.getBalance(account);
  dispatch(actionSetCurrentBalance)
  dispatch(actionSetCurrentAccount(account));
  
}
//REDUCER=====================================================================
const initialState = {
  user: {},
  isLoggedIn: false,
  isFetchingEth: false,
  ethAccounts: [],
  currentEthAccount: '',
  currentEthBalance: '',
  ethProvider: undefined,

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
      case SET_CURRENT_BALANCE:
      return {
        ...state,
        currentEthBalance: action.balance
      }
      case SET_ETH_PROVIDER:
      return {
        ...state,
        ethProvider: action.ethProvider
      }
    default:
      return state;
  }
}
