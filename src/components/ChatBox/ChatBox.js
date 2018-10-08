import React from 'react';
import SingleMsg from './SingleMsg';

function ChatBox(props) {
	const {msgArray, setTipDestination} = props;
	// let msgArray = props.msgArray;
	// let user = props.user;
	// console.log("Chat box props! ", msgArray);
	return (
		<div className="chat-box">
			{msgArray.reverse().map((msg) => {
				return <SingleMsg key={msg.timestamp.nanoseconds+msg.timestamp.seconds} text={msg.body} user={msg.userName} photo={msg.photoURL} uid={msg.uid} setTipDestination={setTipDestination}/>;
			})}
		</div>
	);
}

export default ChatBox;
// Include PropTypes - expect props.msgArray to be an array of objects!
// Assume object looks like this:

// [
//    {
//    name: name,
//   msg: message,
//    feedback: [1, 2, 3]
//    }
// ]

// {type: "SET_CHAT_MESSAGES", messages: {…}}
