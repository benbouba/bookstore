import {GET_ALL_USERS, UPDATE_ORDER_STATUS} from './adminActions'

const initialState = () => ({
  message: '',
  users: {},
  orders: {}
  
})

const REDUCER_ACTIONS = {
  [GET_ALL_USERS]: (state, {users, orders}) => {
    state.users = users
    state.orders = orders
  },
  [UPDATE_ORDER_STATUS]: (state, {ownerID, orders})=>{
    state.orders[ownerID].orders = orders
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

