import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkMakeTransaction } from '../../state/user/reducer';

class TipRecipient extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Need to implement actual sending of tip.
  render() {
    const {
      displayName, photo, makeTransaction, ethProvider, destinationEthAddress, senderEthAddress
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
    displayName: state.userReducer.tipDestination.user,
    photo: state.userReducer.tipDestination.photo,
    destinationEthAddress: state.userReducer.tipDestination.uid,
    ethProvider: state.userReducer.ethProvider,
    senderEthAddress: state.userReducer.currentEthAccount,
  };
}

function mapDispatch(dispatch) {
  return {
    makeTransaction: (source, destination, amount, eth_provider) => {
      dispatch(thunkMakeTransaction(source, destination, amount, eth_provider));
    },
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
