import React, { Component } from 'react'
import DiscourseCard from './DiscourseCard'

export default class DiscourseList extends Component {
  componentDidMount = async () => {
    await this.props.getDiscourseList()
  }

  render () {
    const { discourseList } = this.props
    let styles = {
      display: 'flex',
      flexDirection: 'column'
    }
    return (
      <div className='discourse-list' style={styles}>
        {discourseList.map(elem => {
          if (elem.article) {
            return (
              <DiscourseCard
                discourseId={elem.docId}
                discourseTitle={elem.article.title}
                discourseDescription={elem.article.content}
                discourseImg={elem.article.thread.main_image}
                discoursePublishedAt={elem.article.publishedAt}
                key={elem.docId}
                            />
            )
          } else {
            return (
              <div>
                                Loading...
                            </div>
            )
          }
        })}
      </div>
    )
  }
}
