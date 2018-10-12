import React from 'react';
import ChatBucket from '../ChatBox/ChatBucket';

const Player = () => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '4em',
    alignItems: 'center',
  };
  const imgStyles = {
    height: '12em',
    width: '14em',
  };

  return (
    <div
      className="audio"
      style={styles}
    >
      <img
        src="https://media.wnyc.org/media/photologue/photos/logo_m.gif"
        style={imgStyles}
        alt=""
      />
      <audio controls>
        <source src="https://nprdmp-live01-aac.akacast.akamaistream.net/7/91/364917/v1/npr.akacast.akamaistream.net/nprdmp_live01_aac" />
      </audio>
      <ChatBucket discourseId="WNYCChat" />
    </div>
  );
};

export default Player;
