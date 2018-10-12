import React, { Component } from 'react';
import { connect } from 'react-redux';

class TipRecipient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Need to implement actual sending of tip.
  render() {
    const {
      displayName, photo, makeTransaction, ethProvider,
    } = this.props;
    return (
      <div>
        <span className="mdl-chip mdl-chip--contact mdl-chip--deletable">
          <img
            className="mdl-chip__contact"
            src={photo}
            alt="Contact you're sending to"
          />
          <span className="mdl-chip__text">
            Tip:
            {displayName}
          </span>
          <button
            type="button"
            className="mdl-chip__action"
            alt="Button where your tip goes"
          >
            <i
              className="material-icons"
              onClick={() => {
                makeTransaction(
                  '0x5bb35c9576ef6e42d4447adcb3272f0b8582e82e',
                  '0xcbdde85d7db1628d77580a58d19207c388940a37',
                  '1',
                  ethProvider,
                );
              }}
            >
              done
            </i>
          </button>
        </span>
      </div>
    );
  }
}

// CONTAINER====================================================================
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

TipRecipient = connect(
  mapState,
  mapDispatch,
)(TipRecipient);

export default TipRecipient;
