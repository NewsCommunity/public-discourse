import React, { Component } from 'react'
<<<<<<< HEAD
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
              discourseUrl={elem.article.url}
              discourseTitle={elem.article.title}
              discourseDescription={elem.article.content}
              discourseImg={elem.article.urlToImage}
              discoursePublishedAt={elem.article.publishedAt}
                        />
          )
        })}
=======
import DiscourseCard from './DiscourseCard';

export default class DiscourseList extends Component {

  componentDidMount = () => {
    this.props.getDiscourseList() //UPDATE THIS FUNCTION CALL
  }
  
  render() {
    const { discourseList } = this.props
    return (
      <div className="discourse-list">
        {discourseList.map( (elem) => {
          return <DiscourseCard discourseUrl = {elem.url} discourseTitle = {elem.title} discourseDescription={elem.content} />
        }
        )}
>>>>>>> workingchat
      </div>
    )
  }
}
