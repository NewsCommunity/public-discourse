import types from './types';

const initialState = {
	article: {},
	articleList: []
};

export function articleReducer(state = initialState, action) {
	switch (action.type) {
		case types.SET_SINGLE_ARTICLE:
			return {
				...state,
				article: action.article
			};
		case types.SET_ARTICLE_LIST:
			return {
				...state,
				articles: action.articleList
			};
		default:
			return state;
	}
}
