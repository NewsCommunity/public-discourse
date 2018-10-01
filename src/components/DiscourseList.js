import React, { Component } from 'react'
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
      </div>
    )
  }
}
