import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const DiscourseCard = props => {
  const { discourseUrl, discourseTitle, discourseDescription, discourseImg, discoursePublishedAt } = props
  return (
    <div className='discourse-card'>

      <img className='discourse-card-img' src={`${discourseImg}`} alt='' />

      <div className='discourse-card-content'>
        <Link to={discourseUrl}>{discourseTitle}</Link>
        <p>{discoursePublishedAt}</p>
      </div>
    </div>
  )
}

export default DiscourseCard

