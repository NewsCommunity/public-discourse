import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
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
    this.state = { message: '', error: false };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const { message } = this.state;
    const { postMessage } = this.props;
    event.preventDefault();
    if (this.state.message === '') {
      this.setState({
        message: '',
        error: true,
      });
      return;
    }

    postMessage(message);
    this.setState({ message: '' });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value, error: false });
  }

  render() {
    const { message, error } = this.state;
    const { classes, toggleGif, GIFStatus } = this.props;
    // 'Form-Flex'
    return (
      <React.Fragment>
        <form
          className={error ? 'Form-Flex tip-over' : 'Form-Flex'}
          onSubmit={this.handleSubmit}
        >
          <Button
            variant="fab"
            color="secondary"
            aria-label="Edit"
            className={classes.button}
            onClick={() => toggleGif(!GIFStatus)}
          >
            <Icon>gif</Icon>
          </Button>
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
