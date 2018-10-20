import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import {
  thunkLogInUser,
  thunkLogOutUser,
  actionSetTipDestination,
  loadWeb3,
} from '../../state/user/reducer';


const UserPage = (props) => {
  const {
    user,
    isLoggedIn,
    currentEthAccount,
    currentEthBalance,
    ethProvider,
    logInUser,
    loadWeb3,
  } = props;

  const { displayName, photoURL } = user;
  if (!isLoggedIn) {
    return (
      <div>
        <p onClick={() => logInUser()}>Please log in to see your information.</p>
      </div>
    );
  }

  if (!ethProvider) {
    loadWeb3();
  }
  return (
    <div className="user-details-page">
      <div className="user-photo-name">
        <img
          className="user-photo"
          src={photoURL}
          alt="user profile"
        />
        {ethProvider ? (
          <QRCode
            renderAs="svg"
            fgColor="#000000"
            className="user-QR-code"
            value={currentEthAccount}
          />
        ) : (
          <QRCode
            renderAs="svg"
            fgColor="#c6c6c6"
            className="user-QR-code-blur"
            value="No Eth Provider"
          />
        )}
      </div>
      <span className="display-name">{displayName}</span>
      {ethProvider ? (
        <div>
          <p>
            Public ETH Address:
            {' '}
            <a href={`https://etherscan.io/address/${currentEthAccount}`}>{currentEthAccount}</a>
            {' '}
          </p>

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
    loadWeb3: () => {
      loadWeb3(dispatch);
    },
  };
}

const User = connect(
  mapState,
  mapDispatch,
)(UserPage);

export default User;
