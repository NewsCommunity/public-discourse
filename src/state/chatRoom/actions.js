import types from './types';

export function setChatMessages(messages) {
	return {
		type: types.SET_CHAT_MESSAGES,
		messages
	};
}

const demoData = {userName: "Dennison",
textBody: "Is awesome",
feedback: "Agreed!"}

export function getChatMessages_THUNK(articleId = 'messages'){
  return async (dispatch) => {
    const demoMess = [demoData];
    dispatch(setChatMessages(demoMess))
  }
}

// //we only care about one address right now
// export function getUserAccounts_THUNK(web3) {
// 	return async (dispatch) => {
// 		dispatch(setWeb3Fetch(true));
// 		const accounts = await getAccounts(web3);
// 		dispatch(setUserAccounts(accounts[0]));
// 		dispatch(getAddressBalance_THUNK(web3, accounts[0]));
// 	};
// }

// //helper function
// async function getAccounts(web3) {
// 	return await web3.accounts();
// }


