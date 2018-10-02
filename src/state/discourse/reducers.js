import types from './types'

const initialState = {
  discourse: {},
  discourseList: []
}

export function discourseReducer (state = initialState, action) {
  switch (action.type) {
    case types.SET_SINGLE_DISCOURSE:
      return {
        ...state,
        discourse: action.discourse
      }
    case types.SET_DISCOURSE_LIST:
      return {
        ...state,
        discourseList: action.discourseList
      }
    default:
      return state
  }
}
