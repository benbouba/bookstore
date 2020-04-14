import {
  GET_ALL_BOOKS,
  ADD_BOOKS_TO_STORAGE,
  SET_CURRENT_BOOK,
  REMOVE_BOOK,
  UPDATE_BOOK_PROPERTY,
  ADD_NEW_BOOK,
  FETCHING_CATALOG
} from './catalogActions'

const initialState = () => ({
  books: [],
  fetchinCatalog: false

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
  [REMOVE_BOOK]: (state, books)=>{
    state.books = books
  },
  [ADD_NEW_BOOK]: (state, books)=>{
    state.books = books
  },
  [UPDATE_BOOK_PROPERTY]: (state, books)=>{
    state.books = books
  },
  [FETCHING_CATALOG]: (state, value)=>{
    state.fetchinCatalog = value
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