import types from './types';


const initialState = {
article : [],
articles : [],
};


export function articleReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_SINGLE_ARTICLE:
    return {
      ...state,
      article: action.article,
    }
    case types.SET_MULTIPLE_ARTICLES:
    return {
      ...state,
      articles: action.articles,
    }
    default:
      return state;
  }
}


