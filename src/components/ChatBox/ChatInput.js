import React, { Component } from 'react';

class ChatInput extends Component {
	constructor(props) {
		super(props);
		this.state = { message: '' };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
  }

	handleSubmit(event) {
    const { message } = this.state
    const { discourseId } = this.props
		event.preventDefault();
		this.props.postMessage(message, discourseId);
		this.setState({ message: '' });
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
    const { message } = this.state
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
}

export default ChatInput;
