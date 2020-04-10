import {CLIENT_SAYS_HELLO} from './clientActions'

const initialState = () => ({
  message: '',
  
})

const REDUCER_ACTIONS = {
  [CLIENT_SAYS_HELLO]: (state, message) => {
    state.message = message
  }
}

export default function (state = initialState(), action) {
  state = { ...state }
  const handler = REDUCER_ACTIONS[action.type]
  if (handler) {
    state = handler(state, action.payload) || state
  }
  return state
}

