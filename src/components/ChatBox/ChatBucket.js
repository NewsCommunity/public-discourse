import React, { Component } from "react";
import { ChatBox, ChatInput } from "./index";
import { firestore } from "../../fire";
import Login from "../authentication/login";
import BottomNav from "../BottomNavigation/BottomNav";
import { thunkLogInUser, thunkLogOutUser } from "../../state/user/reducer";
import { connect } from "react-redux";
var firebase = require("firebase");


class ChatBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discourseId: props.discourseId,
      messages: []
    };

    this.getInitialMessages = this.getInitialMessages.bind(this);
    this.addSingleMessageToState = this.addSingleMessageToState.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  async componentDidMount() {
    const { discourseId } = this.state;
    this.subscribeToMessageUpdates(discourseId);
  }

  async getInitialMessages(discourseId, limit = 50) {
    const messages = await firestore
      .collection("discourseList")
      .doc(discourseId)
      .collection("messages")
      .limit(limit)
      .orderBy("timestamp")
      .get();

    messages.forEach((message) => {
      this.addSingleMessageToState(message.data());
    });
  }

  addSingleMessageToState(message) {
    const { messages } = this.state;
    // let newMessageState = new Set([...messages, message]);
    // let messageState = Array.from(newMessageState);
    const newMessages = [ ...messages, message ]
    this.setState({ messages: newMessages });
  }

  async subscribeToMessageUpdates(discourseId) {
    const { messages } = this.state;
    await firestore
      .collection("discourseList")
      .doc(discourseId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(100)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let messageArray = messages;
          messageArray.push(change.doc.data());
          this.setState({ messages: messageArray });
        });
      });
  }

  // This method for TimeStamp is INSECURE
  postMessage(message) {
    const { user, discourseId } = this.props;
    const { displayName } = user
    const date = new Date();
    const messageObj = {
      body: message,
      userName: displayName,
      timestamp: date
    }

    this.addSingleMessageToState(messageObj)
    firestore
      .collection("discourseList")
      .doc(discourseId)
      .collection("messages")
      .add(messageObj)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  }

  render() {
    const { discourseId, messages } = this.state;
    const { logOutUser, logInUser, isLoggedIn, displayName } = this.props;
    return (
      <div className="Chatbucket-container">
        {isLoggedIn ?
          <div onClick={() => logOutUser()}>Logout</div>
        :
          <div onClick={() => logInUser()}>Login</div>
        }
        <ChatBox msgArray={messages} />

        {isLoggedIn ? (
          <ChatInput postMessage={this.postMessage} discourseId={discourseId} />
        ) : (
          <div onClick={() => logInUser()}>Login</div>
        )}
        <div className="bottom-nav">
          <BottomNav />
        </div>

      </div>
    );
  }
}

//CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn
  };
}

function mapDispatch(dispatch) {
  return {
    logOutUser: () => {
      dispatch(thunkLogOutUser());
    },
    logInUser: () => {
      dispatch(thunkLogInUser());
    }
  };
}

ChatBucket = connect(
  mapState,
  mapDispatch
)(ChatBucket);

export default ChatBucket;
