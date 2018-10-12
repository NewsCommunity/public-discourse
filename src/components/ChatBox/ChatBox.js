import React from "react";
import SingleMsg from "./SingleMsg";

function ChatBox(props) {
  const { msgArray, setTipDestination } = props;
  let msgSet = new Set(msgArray)
  msgSet = Array.from(msgSet)
  
  return (
    <div className="chat-box">
      {msgSet.map((msg) => (
        <SingleMsg
          key={msg.timestamp.nanoseconds + msg.timestamp.seconds + Math.random()}
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
