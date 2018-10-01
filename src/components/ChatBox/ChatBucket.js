import React, { Component } from 'react';
import { ChatBox, ChatInput } from './index';
import { firestore } from '../../fire';

class ChatBucket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			discourseId: '',
			messages: []
		};

		this.getInitialMessages = this.getInitialMessages.bind(this);
		this.addSingleMessageToState = this.addSingleMessageToState.bind(this);
		this.postMsg = this.postMsg.bind(this);
	}

	async componentDidMount() {
		//this.getInitialMessages('messages', 50);
		this.subscribeToMsgUpdates();
	}

	async getInitialMessages(databaseId, limit = 50) {
		const messages = await firestore
			.collection('discourseList')
			.doc('0VGlOw9pOgeA1j5ZO0tt')
			.collection('messages')
			.limit(limit)
			.orderBy('timestamp')
			.get();

		//console.log('The messages:', messages);
		messages.forEach((message) => {
			this.addSingleMessageToState(message.data());
		});
	}

	addSingleMessageToState(message) {
		let newMessageState = new Set([ ...this.state.messages, message ]);
		//console.log('This is newmessagestate ', newMessageState);
		let messageState = Array.from(newMessageState);
		//console.log('This is messageState', messageState);
		this.setState((newMessageState) => {
			return { messages: messageState };
		});
	}

	async subscribeToMsgUpdates() {
		//var messageArray = [];

		await firestore
			.collection('discourseList')
			.doc('0VGlOw9pOgeA1j5ZO0tt')
			.collection('messages')
			.orderBy('timestamp', 'asc')
			.limit(20)
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					let messageArray = this.state.messages;
					messageArray.push(change.doc.data());
					//This is the limit
					messageArray = messageArray.slice(0, 20);
					console.log('Message array', messageArray);
					this.setState(() => {
						return { messages: messageArray };
					});
				});
			});
	}

	//This method for TimeStamp is INSECURE but can't figure it out correctly yet.
	postMsg(message, databaseId = 'messages', user = 'demoUser') {
		const date = new Date();
		console.log('The Date is: ', date);
		firestore
			.collection('discourseList')
			.doc('0VGlOw9pOgeA1j5ZO0tt')
			.collection('messages')
			.add({
				body: message,
				userName: user,
				timestamp: date
			})
			.then(function(docRef) {
				console.log('Document written with ID: ', docRef.id);
			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
	}

	render() {
		//console.log('CHATBUCKET dumb component props are: ', this.props);
		return (
			<div className="Chatbucket-container">
				<ChatBox msgArray={this.state.messages} />
				<ChatInput postMsg={this.postMsg} />
			</div>
		);
	}
}

export default ChatBucket;
