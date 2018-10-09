import React, { Component } from 'react'
import { connect } from 'react-redux'
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer'

class Me extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
                THE USER PAGE
            </div>
    )
  }
}

// CONTAINER====================================================================
function mapState (state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn
  }
}

function mapDispatch (dispatch) {
  return {
    logOutUser: () => {
      dispatch(thunkLogOutUser())
    },
    logInUser: () => {
      dispatch(thunkLogInUser())
    },
    setTipDestination: destination => {
      dispatch(actionSetTipDestination(destination))
    },
    postMessage: message => {
      dispatch()
    }
  }
}

export default connect(mapState, mapDispatch)(Me)
