import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer';
import PublicKeyForm from './PublicKeyForm';

const UserPage = (props) => {
  const {
    user, isLoggedIn, currentEthAccount, currentEthBalance, ethProvider, logInUser,
  } = props;

  console.log('This is user:', user);

  const { displayName, photoURL } = user;
  if (!isLoggedIn) {
    return (
      <div>
        <p onClick={() => logInUser()}>Please log in to see your information.</p>
      </div>
    );
  }
  return (
    <div className="user-details-page">
      <div className="user-photo-name">
        <img
          className="user-photo"
          src={photoURL} alt="user profile photo"
        />
        <QRCode value={currentEthAccount} />
        
      </div>
      <span className="display-name">{displayName}</span>
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
        <div>No web3 Ethereum Provider Found.</div>
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

const User = connect(
  mapState,
  mapDispatch,
)(UserPage);

export default User;
