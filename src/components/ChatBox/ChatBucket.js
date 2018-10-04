import React, { Component } from 'react'
import { ChatBox, ChatInput } from './index'
import { firestore } from '../../fire'
import Login from '../authentication/login'
var firebase = require('firebase')

class ChatBucket extends Component {
  constructor (props) {
    super(props)
    this.state = {
      discourseId: props.discourseId,
      messages: [],
      displayName: '',
      email: '',
      loggedIn: false
    }
    console.log('props.discourseId', props.discourseId)
    this.getInitialMessages = this.getInitialMessages.bind(this)
    this.addSingleMessageToState = this.addSingleMessageToState.bind(this)
    this.postMessage = this.postMessage.bind(this)
  }

  async componentDidMount () {
    const { discourseId } = this.state
    this.subscribeToMessageUpdates(discourseId)

        // Authentication component
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
                // User is signed in.
        this.setState({
          displayName: user.displayName,
          email: user.email,
          loggedIn: true
        })
      } else {
                // No user is signed in.
        console.log('No user logged in')
      }
    })
  }

  async getInitialMessages (discourseId, limit = 50) {
    const messages = await firestore
            .collection('discourseList')
            .doc(discourseId)
            .collection('messages')
            .limit(limit)
            .orderBy('timestamp')
            .get()

    messages.forEach(message => {
      this.addSingleMessageToState(message.data())
    })
  }

  addSingleMessageToState (message) {
    const { messages } = this.state
        // why are we using a Set here instead of array?
    let newMessageState = new Set([...messages, message])
    let messageState = Array.from(newMessageState)
    this.setState({ messages: messageState })
  }

  async subscribeToMessageUpdates (discourseId) {
    const { messages } = this.state
    await firestore
            .collection('discourseList')
            .doc(discourseId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .limit(20)
            .onSnapshot(snapshot => {
              snapshot.docChanges().forEach(change => {
                    // why do we make a message array variable when messages are already an array?
                let messageArray = messages
                messageArray.push(change.doc.data())
                this.setState({ messages: messageArray })
              })
            })
  }

    // This method for TimeStamp is INSECURE
  postMessage (message, discourseId, user = this.state.displayName) {
    const date = new Date()
    console.log('The Date is: ', date)
    firestore
            .collection('discourseList')
            .doc(discourseId)
            .collection('messages')
            .add({
              body: message,
              userName: user,
              timestamp: date
            })
            .then(function (docRef) {
              console.log('Document written with ID: ', docRef.id)
            })
            .catch(function (error) {
              console.error('Error adding document: ', error)
            })
  }

  isLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        return true
      } else {
        return false
      }
    })
  }

  doLogOut = () => {
    firebase.auth().signOut().then(() => {
      console.log('Logout')
      this.setState(() => {
        return { loggedIn: false }
      })
    })
  }

  render () {
    const { discourseId, messages, loggedIn } = this.state
    return (
      <div className='Chatbucket-container'>
        {loggedIn ? <div onClick={() => this.doLogOut()}>Logout</div> : <Login />}
        <ChatBox msgArray={messages} />
        {loggedIn ? <ChatInput postMessage={this.postMessage} discourseId={discourseId} /> : <Login />}
      </div>
    )
  }
}

// can we pull out the functionality and add it as a button to the navbar?

export default ChatBucket
