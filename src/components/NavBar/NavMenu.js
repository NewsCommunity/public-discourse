import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

class NavMenu extends React.Component {
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

    return (
      <div>
        <Button aria-owns={anchorEl ? 'simple-menu' : null} aria-haspopup='true' onClick={this.handleClick}>
                    More!
                </Button>

        <Menu id='simple-menu' anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.handleClose}>
            <Link to={`/data`}>Data</Link>
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
            <Link to={`/audio`}>WNYC</Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to={`/about`}>About</Link>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default NavMenu
