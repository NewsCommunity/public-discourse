import types from './types'

const initialState = {
  messages: []
}

export function ChatReducer (state = initialState, action) {
  switch (action.type) {
    case types.SET_CHAT_MESSAGES:
      return {
                // Why do we spread state first if state is just an obj with an empty array?
                // maybe makes more sense if we set state to be just an arr
                // if we aren't going to add other props??
        ...state,
        messages: [...state.messages, action.messages]
      }
    default:
      return state
  }
}
