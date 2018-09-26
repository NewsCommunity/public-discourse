import React, { Component } from 'react';
import fire from './fire';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { messages: [] }; // <- set up react state
	}
	componentWillMount() {
		/* Create reference to messages in Firebase Database */
		let messagesRef = fire.database().ref('messages').orderByKey().limitToLast(100);
		console.log('THIS STARTS AT THE BEGINNING');
		console.log('THE STATE BEFORE SUBSCRIBE: ', this.state.messages);
		messagesRef.on('child_added', (snapshot) => {
			/* Update React state when message is added at Firebase Database */
			console.log('THIS FIRES on SUBSCRIBE:');
			console.log('THE STATE WHEN SUBSCRIBE FIRES: ', this.state.messages);
			let message = { text: snapshot.val(), id: snapshot.key };
			this.setState({ messages: [ message ].concat(this.state.messages) });
		});
	}
	addMessage(e) {
		e.preventDefault(); // <- prevent form submit from reloading the page
		/* Send the message to Firebase */
		fire.database().ref('messages').push(this.inputEl.value);
		this.inputEl.value = ''; // <- clear the input
	}
	render() {
		return (
			<form onSubmit={this.addMessage.bind(this)}>
				<input type="text" ref={(el) => (this.inputEl = el)} />
				<input type="submit" />
				<div> HELLO CHANGES!</div>
				<ul>
					{/* Render the list of messages */
					this.state.messages.map((message) => <li key={message.id}>{message.text}</li>)}
				</ul>
			</form>
		);
	}
}

export default App;