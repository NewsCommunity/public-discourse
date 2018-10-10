import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import ChatInput from '../ChatBox/ChatInput';

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
    classes, onShowToggle, isOpen, isLoggedIn, logInUser, postMessage, toggleGif, GIFStatus
  } = props;

  let multiRender = false;
  if (isOpen && isLoggedIn) {
    multiRender = true;
  }

  return (
    <div className="Bottom-Nav">
    
      <div className="chat-input-left">
        {multiRender ? <ChatInput postMessage={postMessage} toggleGif={toggleGif} GIFStatus={GIFStatus}/> : <div/>}
      </div>
      <div className="chat-input-right">
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={onShowToggle}
        >
          {/* <AddIcon /> */}
          <Icon>chat</Icon>
        </Button>
      </div>
    </div>
  );
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);
