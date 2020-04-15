import {
  GET_ALL_USERS,
  UPDATE_ORDER_STATUS,
  FETCHING_ALL_USERS,
} from "./adminActions"

const initialState = () => ({
  message: '',
  users: {},
  orders: {},
  fetchingAllUsers: false,
})

const REDUCER_ACTIONS = {
  [GET_ALL_USERS]: (state, { users, orders }) => {
    state.users = users
    state.orders = orders
  },
  [UPDATE_ORDER_STATUS]: (state, { ownerID, orders }) => {
    state.orders[ownerID].orders = orders
  },
  [FETCHING_ALL_USERS]: (state, value) => {
    state.fetchingAllUsers = value
  },
}

export default function (state = initialState(), action) {
  state = { ...state }
  const handler = REDUCER_ACTIONS[action.type]
  if (handler) {
    state = handler(state, action.payload) || state
  }
  return state
}
