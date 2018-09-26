import React from 'react'
import SingleMsg from './SingleMsg'

 function ChatBox(props) {
  console.log("ChatBox props are: ", props);
  let msgArray = props.msgArray;
return (
      <div className="chat-box">
      {msgArray.map(msg => {<SingleMsg userName={msg.userName} msg={msg.textBody} feedback={msg.feedback}/>})}
        </div>
)

}

export default ChatBox;
//Include PropTypes - expect props.msgArray to be an array of objects!
//Assume object looks like this:

// [
//    {
//    name: name,
//   msg: message,
//    feedback: [1, 2, 3]
//    }
// ]
