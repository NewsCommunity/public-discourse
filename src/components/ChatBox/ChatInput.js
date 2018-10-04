import React, { Component } from 'react'

class ChatInput extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

<<<<<<< HEAD
  handleSubmit (event) {
    const { message } = this.state
    const { discourseId } = this.props
    event.preventDefault()
    this.props.postMessage(message, discourseId)
    this.setState({ message: '' })
  }
=======
	handleSubmit(event) {
    const { message } = this.state
		event.preventDefault();
		this.props.postMessage(message);
		this.setState({ message: '' });
	}
>>>>>>> 12097e8b10febe14d688bd6a7bebe4fb90cac900

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    const { message } = this.state
<<<<<<< HEAD
    return (
      <form onSubmit={this.handleSubmit}>
        <span className='input'>
          <input
            className='chat-box-input'
            type='text'
            value={message}
            name='message'
            onChange={this.handleChange}
            placeholder='...add discourse'
                    />
          <span />
        </span>
        <input type='submit' />
      </form>
    )
  }
=======
		return (
			<div className="Form-Flex">
			<form className="Form-Flex" onSubmit={this.handleSubmit}>
				<span className="input">
					<textarea
						className="chat-box-input"
						type="text-area" multiline="true"
						value={message}
						name="message"
						onChange={this.handleChange}
						placeholder="...add discourse"
						onKeyPress={(e)=>{e.target.keyCode === 13 && e.preventDefault();}}
					/>
					<span />
				</span>

<button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored chat-button">
  <i className="material-icons" type="submit">send</i>
</button>
			</form>
			</div>
		);
	}
>>>>>>> 12097e8b10febe14d688bd6a7bebe4fb90cac900
}

export default ChatInput

// we should prevent users from placing blank messages.
