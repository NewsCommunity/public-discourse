import types from './types';


const initialState = {
messages : []
};


export function ChatReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_CHAT_MESSAGES:
    return {
      ...state,
      messages: [...state.messages, action.messages]
    }
    default:
      return state;
  }
}


