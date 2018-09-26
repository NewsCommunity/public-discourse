import React, { Component } from 'react';


class ChatInput extends Component {

	constructor(props) {
		super(props);
		this.state = { message: '' };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleSubmit(event) {
		event.preventDefault(); // <- prevent form submit from
		//Call function that was sent down
    alert("We've done it!", this.state.message);
    this.props.postMsg(this.state.message);
		this.setState(() => {
			return { message: '' };
		});
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	render() {
		console.log('The props for the ChatInput are: ', this.props);

		return (
			<form onSubmit={() => this.handleSubmit()}>
				<input type="text" value={this.state.message} name="message" onChange={this.handleChange} />
				<input type="submit" />
			</form>
		);
	}
}

export default ChatInput;

//PROP TYPES!
