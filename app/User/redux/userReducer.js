import {
  USER_SAYS_HELLO,
  LOGIN_USER,
  LOGOUT_USER,
  TOGGLE_DRAWER
} from './userActions'

const initialState = () => ({
  currentUserData: null,
  drawerOpen: false

})

const REDUCER_ACTIONS = {
  [USER_SAYS_HELLO]: (state, message) => {
    state.message = message
  },
  [LOGIN_USER]: (state, currentUser) => {
    state.currentUserData = currentUser
  },
  [LOGOUT_USER]: (state) => {
    state.currentUserData = null
  },
  [TOGGLE_DRAWER]: (state) => {
    state.drawerOpen = !state.drawerOpen
  }
}

export default function (state = initialState(), action) {
  state = {
    ...state
  }
  const handler = REDUCER_ACTIONS[action.type]
  if (handler) {
    state = handler(state, action.payload) || state
  }
  return state
}