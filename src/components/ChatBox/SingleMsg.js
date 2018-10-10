import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';

function SingleMsg(props) {
  const {
    text, user, uid, photo, setTipDestination, gif,
  } = props;
  

  function isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  if(!isEmpty(gif)){
    console.log('Single Message, setTipDestination', gif.images.fixed_height_small.gif_url);
  }

  return (
    <div
      className="single-msg"
      onClick={() => {
        setTipDestination({ user, photo, uid });
      }}
    >
      <div className="single-msg-box">
        <div className="single-msg-profile">
          <div className="user-profile-pic">
            <Tooltip title={user}>
              <img
                className="img-round"
                src={photo}
                alt="user display"
              />
            </Tooltip>
          </div>
        </div>

        <div className="single-msg-text-container">
          {!isEmpty(gif) ? <img className="chatGif" src={gif.images.fixed_height_small.gif_url} alt="Gif" /> : <div className="single-msg-textBody">{text}</div>}
          <div className="single-msg-data-feedback" />
        </div>
      </div>
    </div>
  );
}

export default SingleMsg;
