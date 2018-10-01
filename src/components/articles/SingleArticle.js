import React from 'react'

function SingleArticle (props) {
  console.log('The props for SingleArticle are: ', props)
  const { title, author } = props
  return (
    <div className='single-msg'>
      <p>{title}</p>
      <p>by {author}</p>
    </div>
  )
}

export default SingleArticle
