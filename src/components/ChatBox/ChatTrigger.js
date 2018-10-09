import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 2,
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 20,
    right: theme.spacing.unit * 3,
  },
});

function ChatTrigger(props) {
  const { classes, onShowToggle } = props;
  return (
    <div>
      <Tooltip title="FAB 'position: absolute;'">
        <Button
          variant="fab"
          color="secondary"
          className={classes.absolute}
          onClick={onShowToggle}
        >
          <AddIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

ChatTrigger.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatTrigger);
