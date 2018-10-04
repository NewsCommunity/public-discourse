import React, { Component } from 'react'
// import { firestore } from '../../fire'
import { connect } from 'react-redux'
// var firebase = require('firebase')

class Data extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <p>this is the data component</p>
      </div>
    )
  }
}

export default Data
