import React from 'react'
import SingleArticle from './SingleArticle'

function ArticlesList (props) {
  console.log('ArticlesList props are: ', props)
  let articlesArr = props.articlesArr
  return (
    <div className='articles-list'>
      {articlesArr.map(article => {
        return <SingleArticle title={article.title} author={article.author} key={article.title} />
      })}
    </div>
  )
}

export default ArticlesList
