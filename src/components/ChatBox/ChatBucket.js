import React from 'react';
import {ChatBox,ChatInput} from './index'

function ChatBucket(props){
console.log("CHATBUCKET dumb component props are: ", props)
return (
  <div className="Chatbucket-container">
  <ChatBox   msgArray={props.msgArray}/>
  <ChatInput postMsg={props.postMsg}/>
  </div>
)
}

export default ChatBucket;

