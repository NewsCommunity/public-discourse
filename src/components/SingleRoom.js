import React, { Component } from 'react'
import ChatBucket from '../containers/ChatBucket'

const SingleRoom = props => {
  return (
    <div>
      <div className='discourse-container'>
        <h1>publicDiscourse</h1>
        <div className='single-room'>
          <div className='iframe-container'>
            <iframe src='https://www.huffingtonpost.com/entry/michael-avenatti-donald-trump-brett-kavanaugh_us_5bac5b68e4b082030e782124' />
          </div>
          <ChatBucket />
        </div>
      </div>
    </div>
  )
}

export default SingleRoom
