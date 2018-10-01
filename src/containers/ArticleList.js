import { connect } from 'react-redux'
import ArticleList from '../components/articles/ArticlesList'
import { getArticleList_THUNK } from '../state/discourse/actions'

function mapState (state) {
  return {
    articlesArr: state.discourseReducer.discourseList
  }
}

function mapDispatch (dispatch) {
  return {
    getArticles: () => dispatch(getArticleList_THUNK)
  }
}

export default connect(mapState, mapDispatch)(ArticleList)
