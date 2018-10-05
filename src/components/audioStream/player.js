import React, { Component } from 'react'
import ChatBucket from '../ChatBox/ChatBucket'

export default class Player extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const docId = 'wdBKkCtb3CNdpTqO1KLQ'

    return (
      <div>
        <p>HELLO!</p>
        <p>HELLO!</p>
        <p>HELLO!</p>
        <audio controls>
          <source src='https://nprdmp-live01-aac.akacast.akamaistream.net/7/91/364917/v1/npr.akacast.akamaistream.net/nprdmp_live01_aac' />
        </audio>
        <ChatBucket discourseId={docId} />
      </div>
    )
  }
}

// ====== CONTAINER ======
