import {ADMIN_SAYS_HELLO} from './adminActions'

const initialState = () => ({
  message: '',
  
})

const REDUCER_ACTIONS = {
  [ADMIN_SAYS_HELLO]: (state, message) => {
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

