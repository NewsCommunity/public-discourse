import React, { Component } from 'react'
import { connect } from 'react-redux'
import { thunkGetDiscourseList } from '../../state/discourse/actions'
import { firestore } from '../../fire'
import BarChart from './BarChart'

class Data extends Component {
  constructor (props) {
    super(props)
  }
  async componentDidMount () {
    await this.props.getDiscourseList()
        // await this.getTitlesAndDocIds()
  }

  async getTitlesAndDocIds () {
    const { discourseList } = this.props
    const titles = []
    const discourseIds = []
    const numMessages = []
    discourseList.forEach(discourse => {
      titles.push(discourse.article.title)
      discourseIds.push(discourse.docId)
    })

    await discourseIds.forEach(discourseId => {
      firestore.collection('discourseList').doc(discourseId).collection('messages').get().then(snap => {
        numMessages.push(snap.size)
      })
    })
    console.log('THE NUM MESSAGES', numMessages)
  }

  render () {
    console.log('THE PROPS IN DATA', this.props)
    return (
      <div>
        <h1>WORK IN PROGRESS</h1>
      </div>
    )
  }
}

// ====== CONTAINER ======

function mapState (state) {
  return {
    discourseList: state.discourseReducer.discourseList
  }
}

function mapDispatch (dispatch) {
  return {
    getDiscourseList: () => {
      dispatch(thunkGetDiscourseList())
    }
  }
}

export default connect(mapState, mapDispatch)(Data)
