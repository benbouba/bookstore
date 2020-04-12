import {USER_SAYS_HELLO, LOGIN_USER} from './userActions'

const initialState = () => ({
  currentUserData: null,
  
})

const REDUCER_ACTIONS = {
  [USER_SAYS_HELLO]: (state, message) => {
    state.message = message
  },
  [LOGIN_USER]: (state, currentUser)=>{
    state.currentUserData = currentUser
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

