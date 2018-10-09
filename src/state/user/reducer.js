import firebase from 'firebase';
import Eth from 'ethjs';
// TYPES======================================================================
const SET_USER = 'SET_USER';
const SET_ETH_PROVIDER = 'SET_ETH_PROVIDER';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const SET_CURRENT_BALANCE = 'SET_CURRENT_BALANCE';
const SET_CURRENT_ACCOUNT = 'SET_CURRENT_ACCOUNT';
const FETCH_ETH_CONNECTION = 'FETCH_ETH_CONNECTION';
const SET_TIP_DESTINATION = 'SET_TIP_DESTINATION';
const SET_CHAT_STATUS = 'SET_CHAT_STATUS';
const SET_TIP_STATUS = 'SET_TIP_STATUS';
// ACTIONS====================================================================
const actionSetUser = (userObj, isLoggedIn) => ({
  type: SET_USER,
  user: userObj,
  isLoggedIn,
});

export const actionFetchEth = fetch => ({
  type: FETCH_ETH_CONNECTION,
  fetch,
});

export const actionSetEthAccounts = ethAccounts => ({
  type: SET_ACCOUNTS,
  ethAccounts,
});

export const actionSetCurrentAccount = account => ({
  type: SET_CURRENT_ACCOUNT,
  account,
});

export const actionSetCurrentBalance = balance => ({
  type: SET_CURRENT_BALANCE,
  balance,
});

export const actionSetEthProviderOnState = ethProvider => ({
  type: SET_ETH_PROVIDER,
  ethProvider,
});

export const actionSetTipDestination = (tipDestination) => {
  console.log('Set Tip Destination in the User Reducer is fired!');
  return {
    type: SET_TIP_DESTINATION,
    tipDestination,
  };
};

export const actionSetChatStatus = chatStatus => ({
  type: SET_CHAT_STATUS,
  chatStatus,
});

export const actionSetTipStatus = tipStatus => ({
  type: SET_TIP_STATUS,
  tipStatus,
});

// THUNKS=====================================================================
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const thunkLogInUser = (provider = googleProvider) => async (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log('MY USER IS: ', user);
      const {
        displayName, email, photoURL, uid,
      } = user;
      dispatch(
        actionSetUser(
          {
            displayName,
            email,
            photoURL,
            uid,
          },
          true,
        ),
      );
    } else {
      console.log('No user logged in');
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
  console.log('Window welement', window);
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running.
    const eth = new Eth(window.web3.currentProvider);
    console.log('THE ETH IS:', eth);
    const accounts = await eth.accounts();
    console.log('The accounts:', accounts);

    dispatch(actionSetEthAccounts(accounts));
    dispatch(actionSetCurrentAccount(accounts[0]));
    dispatch(thunkGetEthBalance(accounts[0], eth));
    dispatch(actionSetEthProviderOnState(eth));
    dispatch(actionFetchEth(false));
  } else {
    // We are on the server *OR* the user is not running metamask
    // In this case we aren't connecting to a remote, we need metamask. So this is disconnected and user is warned.
    // const provider = new Web3.providers.HttpProvider('http://loalhost:7545');
    // web3 = new Eth(provider);

    const eth = {};
    dispatch(actionSetEthProviderOnState(eth));
  }
};

export const thunkGetEthBalance = (account, eth) => async (dispatch) => {
  const balance = await eth.getBalance(account);
  dispatch(actionSetCurrentBalance(balance));
};

export const thunkSetNewAccount = (account, eth) => async (dispatch) => {
  const balance = await eth.getBalance(account);
  dispatch(actionSetCurrentBalance);
  dispatch(actionSetCurrentAccount(account));
};
// REDUCER=====================================================================
const initialState = {
  user: {},
  isLoggedIn: false,
  isChatOpen: false,
  isTipActive: false,
  isFetchingEth: false,
  ethAccounts: [],
  currentEthAccount: '',
  currentEthBalance: '',
  ethProvider: undefined,
  tipDestination: {},
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
      };
    case FETCH_ETH_CONNECTION:
      return {
        ...state,
        isFetchingEth: action.fetch,
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        ethAccounts: action.ethAccounts,
      };
    case SET_CURRENT_ACCOUNT:
      return {
        ...state,
        currentEthAccount: action.account,
      };
    case SET_CURRENT_BALANCE:
      return {
        ...state,
        currentEthBalance: action.balance,
      };
    case SET_ETH_PROVIDER:
      return {
        ...state,
        ethProvider: action.ethProvider,
      };
    case SET_TIP_DESTINATION:
      return {
        ...state,
        tipDestination: action.tipDestination,
      };
    case SET_CHAT_STATUS:
      return {
        ...state,
        isChatOpen: action.chatStatus,
      };
    case SET_TIP_STATUS:
      return {
        ...state,
        isTipActive: action.tipStatus,
      };
    default:
      return state;
  }
}
