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
		event.preventDefault();
		this.props.postMessage(message);
		this.setState({ message: '' });
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	render() {
    const { message } = this.state
		return (
			<form onSubmit={this.handleSubmit}>
				<span className="input">
					<input
						className="chat-box-input"
						type="text"
						value={message}
						name="message"
						onChange={this.handleChange}
						placeholder="...add discourse"
					/>
					<span />
				</span>
				<input type="submit" />
			</form>
		);
	}
}

export default ChatInput;
