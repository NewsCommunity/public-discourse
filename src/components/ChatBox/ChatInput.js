import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { message } = this.state;
    const { postMessage } = this.props;
    event.preventDefault();
    postMessage(message);
    this.setState({ message: '' });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // We should prevent users from making blank comments, and rate limit them and no duplicates.

  render() {
    const { message } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <form
          className="Form-Flex"
          onSubmit={this.handleSubmit}
        >
          <textarea
            autoFocus
            className="chat-box-input"
            type="text-area"
            multiline="true"
            value={message}
            name="message"
            onChange={this.handleChange}
            placeholder="...add discourse"
            onKeyPress={(e) => {
              e.target.keyCode === 13 && e.preventDefault();
            }}
          />

          <Button
            variant="fab"
            color="secondary"
            aria-label="Edit"
            type="submit"
            className={classes.button}
          >
            <Icon>edit_icon</Icon>
          </Button>
        </form>
      </React.Fragment>
    );
  }
}

ChatInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatInput);
