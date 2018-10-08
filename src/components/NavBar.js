import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from './drawer'

const styles = {
  root: {
    flexGrow: 1
  }
}

const display = {
  display: 'flex',
  borderRadius: '12px',
  alignItems: 'baseline'
}

function SimpleAppBar (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Toolbar>
          <Typography variant='h6' color='inherit'>
            <div style={display}>
              <Link to={`/`}>publicDiscourse</Link>{' '}
              <Drawer />
            </div>

          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleAppBar)
