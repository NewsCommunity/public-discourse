import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';

function SingleMsg(props) {
  const { text, user, uid, photo, setTipDestination} = props;
  console.log("Single Message, setTipDestination", props);

  return (
    <div className='single-msg' onClick={() => {setTipDestination({user,photo,uid})}}>
      <div className='single-msg-box' >
        <div className='single-msg-profile'>
          <div className='user-profile-pic'>
          <Tooltip title={user} >
            <img
              className='img-round'
              src={photo}
                        />
                        </Tooltip>

          </div>
          
        </div>

        <div className='single-msg-text-container'>
          <div className='single-msg-textBody'>{text}</div>
          <div className='single-msg-data-feedback'>
            {/* {feedback.map((e) => {
						<span>{e}</span>;
					})} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleMsg;
