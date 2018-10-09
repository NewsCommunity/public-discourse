import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

class PublicKeyForm extends Component {
  constructor (props) {
    super(props)
    this.state = { publicKey: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit (event) {
    const { message } = this.state
    const { postMessage } = this.props
    event.preventDefault()
        // postMessage(message)
        // this.setState({ message: '' })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

    // We should prevent users from making blank comments, and rate limit them and no duplicates.

  render () {
    const { publicKey } = this.state
    const { classes } = this.props
    return (
      <React.Fragment>
        <form className='Form-Flex' onSubmit={this.handleSubmit}>
          <textarea
            autoFocus
            className='chat-box-input'
            type='text-area'
            value={publicKey}
            name='publicKey'
            onChange={this.handleChange}
            placeholder='Your public key'
            onKeyPress={e => {
              e.target.keyCode === 13 && e.preventDefault()
            }}
                    />
        </form>
      </React.Fragment>
    )
  }
}

// ChatInput.propTypes = {
//   classes: PropTypes.object.isRequired
// }

export default withStyles(styles)(PublicKeyForm)
