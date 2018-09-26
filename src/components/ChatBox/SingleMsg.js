import React from 'react';

function SingleMsg(props) {
	console.log('The props for SingleMsg are: ', props);
	const { userName = 'anonymous', msg = 'Loreum Ipson baby!', feedback = [ '1 like', '2 fire', '3 love' ] } = props;
	return (
		<div className="single-msg">
			<div className="single-userName">
				<h3>UserName: {userName}</h3>
			</div>
			<div className="single-msg-text-container">
				<div className="single-msg-textBody">
					<p>{msg}</p>
				</div>
				<div className="single-msg-data-feedback">
					{feedback.map((e) => {
						<span>{e}</span>;
					})}
				</div>
			</div>
		</div>
	);
}

export default SingleMsg;
//Include PropTypes!!!!
