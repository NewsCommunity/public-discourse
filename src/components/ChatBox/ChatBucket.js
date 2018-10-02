import React, { Component } from 'react';
import { ChatBox, ChatInput } from './index';
import { firestore } from '../../fire';
import Login from '../authentication/login';
var firebase = require('firebase');
var firebaseui = require('firebaseui');
var ui = new firebaseui.auth.AuthUI(firebase.auth());

class ChatBucket extends Component {
	constructor(props) {
		super(props);
		this.state = {
			discourseId: '',
			messages: [],
			displayName: '',
			email: ''
		};

		this.getInitialMessages = this.getInitialMessages.bind(this);
		this.addSingleMessageToState = this.addSingleMessageToState.bind(this);
		this.postMsg = this.postMsg.bind(this);
	}

	async componentDidMount() {
		//this.getInitialMessages('messages', 50);
		this.subscribeToMsgUpdates();

		//Authentication component
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				this.setState(() => {
					return { displayName: user.displayName, email: user.email };
				});

			} else {
				// No user is signed in.
				console.log('No user logged in');
			}
		});
	}

	async getInitialMessages(databaseId, limit = 50) {
		const messages = await firestore
			.collection('discourseList')
			.doc('0VGlOw9pOgeA1j5ZO0tt')
			.collection('messages')
			.limit(limit)
			.orderBy('timestamp')
			.get();

		messages.forEach((message) => {
			this.addSingleMessageToState(message.data());
		});
	}

	addSingleMessageToState(message) {
		let newMessageState = new Set([ ...this.state.messages, message ]);

		let messageState = Array.from(newMessageState);

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
					messageArray =
					this.setState(() => {
						return { messages: messageArray };
					});
				});
			});
	}

	//This method for TimeStamp is INSECURE
	//This method for userName is INSECURE
	postMsg(message, databaseId = 'messages', user = this.state.displayName) {
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

			})
			.catch(function(error) {
				console.error('Error adding document: ', error);
			});
	}

	render() {
		return (
			<div className="Chatbucket-container">
				<Login />
				<ChatBox msgArray={this.state.messages} />
				<ChatInput postMsg={this.postMsg} />
			</div>
		);
	}
}

export default ChatBucket;
