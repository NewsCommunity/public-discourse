import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const DiscourseCard = props => {
  const { discourseTitle, discourseDescription, discourseImg } = props
  return (
    <div className='card'>
      <img className='card-img-top' src={`${discourseImg}`} alt='Card image cap' />
      <div className='card-body'>
        <h5 className='card-title'>{discourseTitle}</h5>
        <p className='card-text'>{discourseDescription}</p>
        <a href='#' className='btn btn-primary'>Go somewhere</a>
      </div>
    </div>
  )
}

export default DiscourseCard
