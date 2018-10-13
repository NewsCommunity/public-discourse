import React from 'react';
import { connect } from 'react-redux';
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer';
import PublicKeyForm from './PublicKeyForm';

let Me = (props) => {
  const {
    user, isLoggedIn, currentEthAccount, currentEthBalance, ethProvider,
  } = props;

  console.log("Details:", currentEthAccount, currentEthBalance, ethProvider);
  const { displayName } = user;
  if (!isLoggedIn) {
    return (
      <div>
        <p>Please log in to see your information</p>
      </div>
    );
  }
  return (
    <div>
      <p>
        Welcome,
        {displayName}
      </p>
      {ethProvider ? (
        <div>
          <p>Public ETH Address: </p>
          <p>{currentEthAccount}</p>
          <p>
Your Balance:
            {ethProvider.utils.fromWei(currentEthBalance, 'ether')}
            {' '}
: ETH
          </p>
          <p>this feature is currently a work in progress</p>
        </div>
      ) : (
        <div />
      )}

      <PublicKeyForm />
    </div>
  );
};

// CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    currentEthAccount: state.userReducer.currentEthAccount,
    currentEthBalance: state.userReducer.currentEthBalance,
    ethProvider: state.userReducer.ethProvider,
  };
}

function mapDispatch(dispatch) {
  return {
    logOutUser: () => {
      dispatch(thunkLogOutUser());
    },
    logInUser: () => {
      dispatch(thunkLogInUser());
    },
    setTipDestination: (destination) => {
      dispatch(actionSetTipDestination(destination));
    },
  };
}

Me = connect(
  mapState,
  mapDispatch,
)(Me);

export default Me;
