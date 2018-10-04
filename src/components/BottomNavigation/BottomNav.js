import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
  root: {
    width: 414,
  },
};

class BottomNav extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      // <BottomNavigation
      //   value={value}
      //   onChange={this.handleChange}
      //   showLabels
      //   className={classes.root}
      // >
      //   <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />

      //   <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} data-badge="4"/>
      //   <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      // </BottomNavigation>
      <div className="bottom-nav">
      <div>
      <span class="mdl-badge" data-badge="4">Inbox</span>
      </div><div>
      <div class="material-icons mdl-badge mdl-badge--overlap" data-badge="1">account_box</div>
      </div>

      </div>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
