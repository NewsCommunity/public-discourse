import React from "react";
import SingleMsg from "./SingleMsg";

function ChatBox(props) {
  const { msgArray, setTipDestination } = props;

  return (
    <div className="chat-box">
      {msgArray.map((msg) => (
        <SingleMsg
          key={msg.timestamp.nanoseconds + msg.timestamp.seconds}
          text={msg.body}
          user={msg.userName}
          photo={msg.photoURL}
          uid={msg.uid}
          setTipDestination={setTipDestination}
          gif={msg.gif}
        />
      ))}
    </div>
  );
}

export default ChatBox;
