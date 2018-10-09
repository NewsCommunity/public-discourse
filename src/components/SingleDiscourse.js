import React, { Component } from 'react'
import ChatBucket from '../containers/ChatBucket'
import { thunkGetSingleDiscourse } from '../state/discourse/actions'
import { connect } from 'react-redux'
import Loading from './Loading'
import Parser from 'html-react-parser'
class SingleDiscourse extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount = async () => {
    await this.props.getSingleDiscourse(this.props.match.params.docId)
  }

  render () {
    const { discourse, match } = this.props
    const discourseId = match.params.docId

    if (discourse.article) {
      const { url, title } = discourse.article
      return (
        <div>
          <div className='discourse-container'>
            <div className='single-room'>
              <div className='iframe-container'>
                <h3>{Parser(discourse.article.title)}</h3>{Parser(discourse.article.html)}
              </div>
              <ChatBucket discourseId={discourseId} />
            </div>
          </div>
        </div>
      )
    } else {
      return <Loading />
    }
  }
}

// CONTAINER===============================

function mapState (state) {
  return {
    discourse: state.discourseReducer.discourse
  }
}

function mapDispatch (dispatch) {
  return {
    getSingleDiscourse: discourseId => {
      dispatch(thunkGetSingleDiscourse(discourseId))
    }
  }
}

export default (SingleDiscourse = connect(mapState, mapDispatch)(SingleDiscourse))
