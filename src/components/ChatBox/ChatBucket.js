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
		await this.getInitialMessages('messages', 50);
		await this.subscribeToMsgUpdates();
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

	subscribeToMsgUpdates() {
		firestore
			.collection('discourseList')
			.doc('0VGlOw9pOgeA1j5ZO0tt')
			.collection('messages')
			.orderBy('timestamp')
			.limit(1)
			.onSnapshot((snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						const newMessage = change.doc.data();

						let newState = this.state.messages;
						newState.push(newMessage);

						this.setState(() => {
							return { messages: newState };
						});
					}
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
