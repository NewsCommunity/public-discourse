import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function BottomNav(props) {
  const {
    classes, onShowToggle, isOpen, isLoggedIn, logInUser,
  } = props;
  return (
    <div className="Bottom-Nav">
      {(isLoggedIn && !isOpen) ? (
        <span />
      ) : (
        <React.Fragment>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Edit"
			className={classes.button}
			onClick={logInUser}
          >
            Log in to Chat
          </Button>
        </React.Fragment>
      )}

      {isOpen ? (
        <React.Fragment>
          <Button
            variant="fab"
            color="secondary"
            aria-label="Edit"
            className={classes.button}
          >
            <Icon>edit_icon</Icon>
          </Button>
        </React.Fragment>
      ) : (
        <div />
      )}
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        className={classes.button}
        onClick={onShowToggle}
      >
        <AddIcon />
      </Button>
    </div>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
