import React, { Component } from 'react'
import DiscourseCard from './DiscourseCard'

export default class DiscourseList extends Component {
  componentDidMount = async () => {
    await this.props.getDiscourseList() // UPDATE THIS FUNCTION CALL
  }

  render () {
    const { discourseList } = this.props
    console.log('INSIDE THE DISCOURSELIST PROPS =>', discourseList[0])
    return (
      <div className='discourse-list'>
        {discourseList.map(elem => {
          return (
            <DiscourseCard
              discourseUrl={elem.article.url}
              discourseTitle={elem.article.title}
              discourseDescription={elem.article.content}
                        />
          )
        })}
      </div>
    )
  }
}