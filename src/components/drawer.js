import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render () {
    const { classes } = this.props

    const leftList = (
      <div className={classes.list}>
        <List>
          <Link to={`/data`}>Data</Link>
        </List>
        <Divider />
        <List>
          <Link to={`/audio`}>WNYC</Link>
        </List>
      </div>
        )
    const rightList = (
      <div className={classes.list}>
        <List>
          <Link to={`/`}>Some user stuff</Link>
        </List>
        <Divider />
        <List>
          <Link to={`/`}>some other user stuff</Link>
        </List>
      </div>
        )

    return (
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>Navigation</Button>
        <Button onClick={this.toggleDrawer('right', true)}>Info</Button>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
                >
          <div
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
                    >
            {leftList}
          </div>
        </SwipeableDrawer>

        <SwipeableDrawer
          anchor='right'
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
                >
          <div
            tabIndex={0}
            role='button'
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
                    >
            {rightList}
          </div>
        </SwipeableDrawer>
      </div>
    )
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SwipeableTemporaryDrawer)
