import React from 'react';

function SingleMsg(props) {
	const { text, user } = props;

	return (
		<div className="single-msg">
			<div className="single-msg-box">
				<div className="single-msg-profile">
					<div className="user-profile-pic">
						<img
							className="img-round"
							src="https://previews.123rf.com/images/demkat/demkat1602/demkat160200082/52934624-a-single-white-glazed-donut-with-sprinkles-isolated-white-background.jpg"
						/>
					</div>
					<div className="user-profile-name">{user}</div>
				</div>

				<div className="single-msg-text-container">
					<div className="single-msg-textBody">{text}</div>
					<div className="single-msg-data-feedback">
						{/* {feedback.map((e) => {
						<span>{e}</span>;
					})} */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleMsg;
