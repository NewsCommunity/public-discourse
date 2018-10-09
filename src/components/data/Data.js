import React, { Component } from 'react'
import { connect } from 'react-redux'
import { thunkGetDiscourseList } from '../../state/discourse/actions'
import PieChart from './PieChart'
import BarChart from './BarChart'
import ChatBucket from '../ChatBox/ChatBucket'
import Loading from '../Loading'
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
    console.log('The props in ', this.props.discourseList)
    discourseList.forEach(discourse => {
      sources[discourse.article.source.name] = sources[discourse.article.source.name] + 1 || 1
    })

    if (this.props.discourseList) {
      return (
        <div className='data-container' style={{ overflowX: 'auto', fontSize: '14px' }}>
          <h1>Our Sources</h1>
          <PieChart sourcesData={sources} />
          <ChatBucket discourseId={'dataChat'} />
        </div>
      )
    } else {
      return <Loading />
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
