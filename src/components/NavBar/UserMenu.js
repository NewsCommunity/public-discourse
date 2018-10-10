import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { thunkLogInUser, thunkLogOutUser } from '../../state/user/reducer'

class UserMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { anchorEl } = this.state
    const { user, isLoggedIn, logOutUser, logInUser } = this.props
    if (!isLoggedIn) {
      return (<Button size="small"  onClick={() => logInUser()}>
      Login
    </Button>)
    }
    return (
      <div>
        <Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup='true' onClick={this.handleClick}>
          <img className='img-round' src={`${user.photoURL}`} alt='' />
        </Button>
        <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            <Link to={`/me`}>Me</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <div onClick={() => logOutUser()}>Log Out</div>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

// CONTAINER
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
    }
  }
}

export default connect(mapState, mapDispatch)(UserMenu)
