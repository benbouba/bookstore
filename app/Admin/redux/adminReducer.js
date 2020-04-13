import {GET_ALL_USERS} from './adminActions'

const initialState = () => ({
  message: '',
  users: {}
  
})

const REDUCER_ACTIONS = {
  [GET_ALL_USERS]: (state, users) => {
    state.users = users
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

