import React, { Component } from 'react'
import DiscourseCard from './DiscourseCard'

export default class DiscourseList extends Component {
  componentDidMount = async () => {
    await this.props.getDiscourseList()
  }

  render () {
    const { discourseList } = this.props
    return (
      <div className='discourse-list'>
        {discourseList.map(elem => {
          return (
            <DiscourseCard
              discourseId={elem.docId}
              discourseTitle={elem.article.title}
              discourseDescription={elem.article.content}
              discourseImg={elem.article.urlToImage}
              discoursePublishedAt={elem.article.publishedAt}
              key={elem.docId}
                        />
          )
        })}
      </div>
    )
  }
}
