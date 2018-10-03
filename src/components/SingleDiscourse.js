import React, { Component } from 'react'
import ChatBucket from '../containers/ChatBucket'
import { thunkGetSingleDiscourse } from '../state/discourse/actions'
import { connect } from 'react-redux'

class SingleDiscourse extends Component {
  constructor (props) {
    super(props)
    console.log('inside singlediscourse', this.props.match.params.docId)
  }

  componentDidMount = async () => {
    await this.props.getSingleDiscourse(this.props.match.params.docId)
  }

  render () {
    const { discourse } = this.props
    if (discourse.article) {
      const { url, title } = discourse.article
      return (
        <div>
          <div className='discourse-container'>
            <h1>publicDiscourse: {title}</h1>
            <div className='single-room'>
              <div className='iframe-container'>
                <iframe src={url} />
              </div>
              <ChatBucket discourseId={discourse.docId} />
            </div>
          </div>
        </div>
      )
    }
    return <div>Loading...</div>
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
