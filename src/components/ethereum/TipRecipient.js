import React, { Component } from 'react';
import { connect } from 'react-redux';

class TipRecipient extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {

		const { displayName } = this.props;
		return (
			<div>
				<span class="mdl-chip mdl-chip--contact mdl-chip--deletable">
					<img class="mdl-chip__contact" src="https://getmdl.io/templates/dashboard/images/user.jpg" />
					<span class="mdl-chip__text">Tip: {displayName}</span>
					<a href="#" class="mdl-chip__action">
						<i class="material-icons">done</i>
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
