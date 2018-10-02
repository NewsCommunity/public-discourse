import React, { Component } from 'react'

class ChatInput extends Component {
  constructor (props) {
    super(props)
    this.state = { message: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit (event) {
    event.preventDefault()
    this.props.postMsg(this.state.message)
    this.setState(() => {
      return { message: '' }
    })
  }

  handleChange (event) {
    this.setState({ [event.target.name]: event.target.value })
  }

	render() {
		//console.log('The props for the ChatInput are: ', this.props);

		return (
			<form onSubmit={this.handleSubmit}>
			<span className="input">
				<input className="chat-box-input" type="text" value={this.state.message} name="message" onChange={this.handleChange} placeholder="...add discourse"/>
				<span></span></span>
				<input type="submit" />
			</form>
		);
	}
}

export default ChatInput
