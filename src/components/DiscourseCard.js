import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const DiscourseCard = props => {
  const { discourseId, discourseTitle, discourseDescription, discourseImg, discoursePublishedAt } = props
  return (
    <div className='card'>
      <img className='card-img-top' src={`${discourseImg}`} alt='Card image cap' />
      <div className='card-body'>
        <h5 className='card-title'>{discourseTitle}</h5>
        <p className='card-text'>{discourseDescription}</p>
        <Link to={`/discourse/${discourseId}`}>Chat about this!</Link>
      </div>
    </div>
  )
}

export default DiscourseCard
