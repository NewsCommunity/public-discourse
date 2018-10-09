import React, { Component } from 'react'
import { connect } from 'react-redux'
import { thunkGetDiscourseList } from '../../state/discourse/actions'
import PieChart from './PieChart'
import ChatBucket from '../ChatBox/ChatBucket'

class Data extends Component {
  constructor (props) {
    super(props)
  }

  async componentDidMount () {
    await this.props.getDiscourseList()
  }

  render () {
    let discourseList = this.props.discourseList
    let sources = {}
    discourseList.forEach(discourse => {
      sources[discourse.article.thread.site] = sources[discourse.article.thread.site] + 1 || 0
    })
    const styles = {
      overFlow: 'scroll'
    }

    if (this.props.discourseList) {
      return (
        <div className='data-container' style={{ overflowX: 'auto', fontSize: '14px' }}>
          <h1>Our Sources</h1>
          <PieChart sourcesData={sources} />
          <ChatBucket discourseId={'dataChat'} />
        </div>
      )
    } else {
      return (
        <div>
                    Loading...
                </div>
      )
    }
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
