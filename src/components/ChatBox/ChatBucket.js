import React, { Component } from "react";
import { connect } from "react-redux";
import { Selector } from "react-giphy-selector";
import { ChatBox } from "./index";
import { firestore } from "../../fire";
import BottomNav from "../BottomNavigation/BottomNav";
import {
  thunkLogInUser,
  thunkLogOutUser,
  actionSetTipDestination,
  actionSetGif
} from "../../state/user/reducer";
import BlockChainBar from "../Ethereum/BlockChainBar";

class ChatBucket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      chatOpen: false
    };
  }

  async componentDidMount() {
    const { discourseId } = this.props;
    this.subscribeToMessageUpdates(discourseId);
  }

  onShowToggle = () => {
    const { chatOpen } = this.state;
    const toggleState = !chatOpen;
    this.setState(() => ({ chatOpen: toggleState }));
  };

  async subscribeToMessageUpdates(discourseId) {
    await firestore
      .collection("discourseList")
      .doc(discourseId)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(100)
      .onSnapshot((snapshot) => {
        const { messages } = this.state;
        let messagesFromFirebase = [];
        snapshot.docChanges().forEach((change) => {
          messagesFromFirebase.push(change.doc.data());
        });
        // messagesFromFirebase.reverse();
        const newMessages = [...messagesFromFirebase, ...messages];
        this.setState({ messages: newMessages });
      });
  }

  postMessage = (message, gif = {}) => {
    console.log('postMessage fired')
    const { user, discourseId, toggleGif } = this.props;
    const { displayName, uid, photoURL } = user;
    const date = new Date();
    const messageObj = {
      body: message,
      userName: displayName,
      timestamp: date,
      uid,
      photoURL,
      gif
    };

    firestore
      .collection("discourseList")
      .doc(discourseId)
      .collection("messages")
      .add(messageObj);

    toggleGif(false);
  };

  render() {
    const { messages, chatOpen } = this.state;
    const {
      logInUser,
      isLoggedIn,
      setTipDestination,
      tipDestination,
      GIFStatus,
      toggleGif
    } = this.props;

    return (
      <div
        className={
          chatOpen
            ? "Chatbucket-Container White-Background"
            : "Chatbucket-Container"
        }
      >
        {GIFStatus ? (
          <div className="gifBar">
            <Selector
              apiKey="KP3uURmACOmXvXYKnYDjglkk5LAOu9DQ"
              onGifSelected={(gif) => this.postMessage("GIFGIF8x8", gif)}
            />
          </div>
        ) : (
          <div />
        )}
        
        {chatOpen ? (
          <React.Fragment>
            <div>
              <BlockChainBar tipDestination={tipDestination} />
              <ChatBox
                msgArray={messages}
                setTipDestination={setTipDestination}
              />
            </div>
          </React.Fragment>
        ) : (
          <div />
        )}
        <BottomNav
          onShowToggle={this.onShowToggle}
          isOpen={chatOpen}
          isLoggedIn={isLoggedIn}
          logInUser={logInUser}
          postMessage={this.postMessage}
          GIFStatus={GIFStatus}
          toggleGif={toggleGif}
          GIFStatus={GIFStatus}
        />
      </div>
    );
  }
}

// CONTAINER====================================================================
function mapState(state) {
  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
    tpDestination: state.userReducer.tipDestination,
    isTipActive: state.userReducer.isTipActive,
    GIFStatus: state.userReducer.GIFStatus,
    ethProvider: state.userReducer.ethProvider,
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
    setTipDestination: (destination) => {
      dispatch(actionSetTipDestination(destination));
    },
    toggleGif: (bool) => {
      dispatch(actionSetGif(bool));
    }
  };
}

export default (ChatBucket = connect(
  mapState,
  mapDispatch
)(ChatBucket));
