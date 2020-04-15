import {
  ADD_BOOK_TO_CART,
  PAY_ORDER,
  CANCEL_ORDER,
  GET_CLIENT_ORDERS,
  REMOVE_BOOK_FROM_CART,
  UPDATE_BOOK_QUANTITY,
} from './clientActions'

const initialState = () => ({
  message: '',
  orders: [],
})

const REDUCER_ACTIONS = {
  [ADD_BOOK_TO_CART]: (state, orders) => {
    state.orders = orders
  },
  [PAY_ORDER]: (state, orders) => {
    state.orders = orders
  },
  [CANCEL_ORDER]: (state, orders) => {
    state.orders = orders
  },
  [REMOVE_BOOK_FROM_CART]: (state, orders) => {
    state.orders = orders
  },
  [GET_CLIENT_ORDERS]: (state, orders) => {
    state.orders = orders
  },
  [UPDATE_BOOK_QUANTITY]: (state, orders) => {
    state.orders = orders
  },
}

export default function (state = initialState(), action) {
  state = {
    ...state,
  }
  const handler = REDUCER_ACTIONS[action.type]
  if (handler) {
    state = handler(state, action.payload) || state
  }
  return state
}
