import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ChatBox, ChatInput } from './index';
import { firestore } from '../../fire';
import Login from '../authentication/login';
import BottomNav from '../BottomNavigation/BottomNav';
import { thunkLogInUser, thunkLogOutUser, actionSetTipDestination } from '../../state/user/reducer';
import BlockChainBar from '../ethereum/BlockChainBar';
import ChatTrigger from '../ChatBox/ChatTrigger';

const firebase = require('firebase');

class ChatBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatOpen: false,
    };

    this.getInitialMessages = this.getInitialMessages.bind(this);
    this.addSingleMessageToState = this.addSingleMessageToState.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.onShowToggle = this.onShowToggle.bind(this);
  }

  async componentDidMount() {
    const { discourseId } = this.props;

    this.subscribeToMessageUpdates(discourseId);
  }

  async getInitialMessages(discourseId, limit = 50) {
    const messages = await firestore
      .collection('discourseList')
      .doc(discourseId)
      .collection('messages')
      .limit(limit)
      .orderBy('timestamp')
      .get();

    messages.forEach(message => {
      this.addSingleMessageToState(message.data());
    });
  }

  addSingleMessageToState(message) {
    const { messages } = this.state;
    // let newMessageState = new Set([...messages, message]);
    // let messageState = Array.from(newMessageState);
    const newMessages = [...messages, message];
    this.setState({ messages: newMessages });
  }

  onShowToggle() {
    const toggleState = !this.state.chatOpen;
    this.setState(()=> {return { chatOpen: toggleState }});
  }

  async subscribeToMessageUpdates(discourseId) {
    const { messages } = this.state;
    await firestore
      .collection('discourseList')
      .doc(discourseId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .limit(100)
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          const messageArray = messages;
          messageArray.push(change.doc.data());
          this.setState({ messages: messageArray });
        });
      });
  }

  // This method for TimeStamp is INSECURE
  postMessage(message) {
    const { user, discourseId } = this.props;
    const { displayName, uid, photoURL } = user;
    const date = new Date();
    const messageObj = {
      body: message,
      userName: displayName,
      timestamp: date,
      uid,
      photoURL,
    };

    this.addSingleMessageToState(messageObj);
    firestore
      .collection('discourseList')
      .doc(discourseId)
      .collection('messages')
      .add(messageObj)
      .then(docRef => {})
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }

 

  render() {
    const { messages } = this.state;
    const {
      logOutUser,
      logInUser,
      isLoggedIn,
      displayName,
      discourseId,
      tipDestination,
    } = this.props;

      console.log("The props of chatBucket are:", this.props);

    return (
      <div className={this.state.chatOpen ? "Chatbucket-Container White-Background" : "Chatbucket-Container" }>
        {isLoggedIn ? (
          <React.Fragment>
          <BlockChainBar />
          <ChatInput postMessage={this.postMessage} user={this.props.user} />
          </React.Fragment>
        ) : (<span/>)}
        
        {this.state.chatOpen ? (
          <div>
          
          <ChatBox msgArray={messages} setTipDestination={this.props.setTipDestination} />
          
          </div>
          ) :( <div/>)}
          <BottomNav onShowToggle={this.onShowToggle} isOpen={this.state.chatOpen} isLoggedIn={isLoggedIn} logInUser={logInUser}/>
      </div>
    );
  }
}

// CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
  };
}

function mapDispatch(dispatch) {
  return {
    logOutUser: () => {
      dispatch(thunkLogOutUser());
    },
    logInUser: () => {
      dispatch(thunkLogInUser());
    },
    setTipDestination: destination => {
      dispatch(actionSetTipDestination(destination));
    },
  };
}

ChatBucket = connect(
  mapState,
  mapDispatch,
)(ChatBucket);

export default ChatBucket;
