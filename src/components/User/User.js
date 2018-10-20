import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import {
  thunkLogInUser,
  thunkLogOutUser,
  actionSetTipDestination,
  loadWeb3,
  thunkGetUserHistory,
} from '../../state/user/reducer';

class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  render() {
    const {
      user,
      isLoggedIn,
      currentEthAccount,
      currentEthBalance,
      ethProvider,
      logInUser,
      loadWeb3,
      loadHistory,
      userHistory,
    } = this.props;

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

    if (user && userHistory.length < 1) {
      loadHistory(user);
    }

    const historyItems = userHistory.map(discourse => <li key={discourse} >{discourse}</li>);

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
              Balance:
              {ethProvider.utils.fromWei(currentEthBalance, 'ether')}
              {' '}
: ETH
            </p>
            <div className="user-discourse-history">
            Discourse History:
              <div className="user-discourse-history-table"><ul>{historyItems}</ul></div>
            </div>
            <p>this feature is currently a work in progress</p>
          </div>
        ) : (
          <div>No web3 Ethereum Provider Found.</div>
        )}
      </div>
    );
  }
}

// CONTAINER====================================================================
function mapState(state) {
  const {
    user,
    isLoggedIn,
    currentEthAccount,
    currentEthBalance,
    ethProvider,
    userHistory,
  } = state.userReducer;
  return {
    user,
    isLoggedIn,
    currentEthAccount,
    currentEthBalance,
    ethProvider,
    userHistory,
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
    loadHistory: (user) => {
      dispatch(thunkGetUserHistory(user));
    },
  };
}

const User = connect(
  mapState,
  mapDispatch,
)(UserPage);

export default User;
