import React from 'react';
import { connect } from 'react-redux';
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer';
import PublicKeyForm from './PublicKeyForm';

let Me = (props) => {
  const { user, isLoggedIn } = props;
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
      <p>Here you can set your public address</p>
      <p>this feature is currently a work in progress</p>
      <PublicKeyForm />
    </div>
  );
}

// CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
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
