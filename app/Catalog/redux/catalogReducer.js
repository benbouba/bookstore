import {
  GET_ALL_BOOKS,
  ADD_BOOKS_TO_STORAGE,
  SET_CURRENT_BOOK
} from './catalogActions'

const initialState = () => ({
  books: [],

})
const REDUCER_ACTIONS = {
  [GET_ALL_BOOKS]: (state, books) => {
    state.books = books
  },
  [ADD_BOOKS_TO_STORAGE]: (state, books) => {
    state.books = books
  },
  [SET_CURRENT_BOOK]: (state, bookID) => {
    state.currentBook = bookID
  },
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