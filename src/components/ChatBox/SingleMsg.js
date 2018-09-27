import React from 'react';

function SingleMsg(props) {
	console.log('The props for SingleMsg are: ', props);
	const { text, user } = props;
	return (
		<div className="single-msg">
			<div className="single-userName">user: {user}</div>
			<div className="single-msg-text-container">
				<div className="single-msg-textBody">{text}</div>
				<div className="single-msg-data-feedback">
					{/* {feedback.map((e) => {
						<span>{e}</span>;
					})} */}
				</div>
			</div>
		</div>
	);
}

export default SingleMsg;
//Include PropTypes!!!!

//{type: "SET_CHAT_MESSAGES", messages: {…}}
