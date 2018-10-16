import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Icon from '@material-ui/core/Icon';
import ChatInput from '../ChatBox/ChatInput';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    height: 40,
    width: 40,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function BottomNav(props) {
  const {
    classes, onShowToggle, isOpen, isLoggedIn, postMessage, toggleGif, GIFStatus
  } = props;

  let multiRender = false;
  if (isOpen && isLoggedIn) {
    multiRender = true;
  }

  return (
    <div className="Bottom-Nav">
    
      
        {multiRender ? <ChatInput postMessage={postMessage} toggleGif={toggleGif} GIFStatus={GIFStatus}/> : <div/>}
     
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
