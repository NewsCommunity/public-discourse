import React, { Component } from 'react'
import { ChatBox, ChatInput } from './index'

class ChatBucket extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    this.props.subscribe('messages', 100)
  }

  render () {
    return (
      <div className='Chatbucket-container'>
        <ChatBox msgArray={this.props.msgArray} />
        <ChatInput postMsg={this.props.postMsg} />
      </div>
    )
  }
}

export default ChatBucket
