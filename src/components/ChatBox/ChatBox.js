import React from 'react';
import SingleMsg from './SingleMsg';

function ChatBox(props) {
	let msgArray = props.msgArray;
	let user = props.user;
	return (
		<div className="chat-box">
			{msgArray.map((msg) => {
				return <SingleMsg text={msg.body} user={msg.userName} />;
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
