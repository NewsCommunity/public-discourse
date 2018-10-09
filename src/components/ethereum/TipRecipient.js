import React, { Component } from 'react';
import { connect } from 'react-redux';

class TipRecipient extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


// 	sendTip = () => {

// 	web3.eth.sendTransaction({from:myaddress,to:toaddress, value:web3.toWei(1, "ether")};

// }


	render() {

		const { displayName, photo } = this.props;
		return (
			<div>
				<span className="mdl-chip mdl-chip--contact mdl-chip--deletable">
					<img className="mdl-chip__contact" src={photo} />
					<span className="mdl-chip__text">Tip: {displayName}</span>
					<a href="#" className="mdl-chip__action">
						<i className="material-icons">done</i>
					</a>
				</span>
			</div>
		);
	}
}

//CONTAINER====================================================================
function mapState(state) {
	return {
		// user: state.userReducer.user,
		// isLoggedIn: state.userReducer.isLoggedIn,	
		// fullUserState: state.userReducer,
		// currentBalance: state.userReducer.currentEthBalance,
		// currentAccount: state.userReducer.currentEthAccount,
		// availibleAccounts: state.userReducer.ethAccounts,
		// isFetchingEth: state.userReducer.isFetchingEth,
		// ethProvider: state.userReducer.ethProvider
	};
}

function mapDispatch(dispatch) {
	return {
		// setEthProvider: () => {
		// 	dispatch(thunkSetEthProdiver());
		// },
		// setNewAccount: (account) => {
		// 	dispatch(thunkSetNewAccount(account));
		// }
		// logOutUser: () => {
		// 	dispatch(thunkLogOutUser());
		// },
		// logInUser: () => {
		// 	dispatch(thunkLogInUser());
		// }
	};
}

TipRecipient = connect(mapState, mapDispatch)(TipRecipient);

export default TipRecipient;
