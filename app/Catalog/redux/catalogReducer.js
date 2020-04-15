import {
  GET_ALL_BOOKS,
  ADD_BOOKS_TO_STORAGE,
  SET_CURRENT_BOOK,
  REMOVE_BOOK_FROM_CATALOG,
  UPDATE_BOOK_PROPERTY,
  ADD_NEW_BOOK_TO_CATALOG,
  FETCHING_CATALOG,
  TOGGLE_ADD_BOOK_MODAL,
  TOGGLE_EDIT_BOOK_MODAL,
  ADDING_OR_EDITING_BOOK,
  SHOW_NOTIFICATION,
} from './catalogActions'

const initialState = () => ({
  books: [],
  fetchinCatalog: false,
  editBookModalVisible: false,
  addBookModalVisible: false,
  addingOrEditingBook: false,
  showNotification: false,
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
  [REMOVE_BOOK_FROM_CATALOG]: (state, books) => {
    state.books = books
  },
  [ADD_NEW_BOOK_TO_CATALOG]: (state, books) => {
    state.books = books
  },
  [UPDATE_BOOK_PROPERTY]: (state, books) => {
    state.books = books
  },
  [FETCHING_CATALOG]: (state, value) => {
    state.fetchinCatalog = value
  },
  [TOGGLE_EDIT_BOOK_MODAL]: (state, value) => {
    state.editBookModalVisible = value
  },
  [TOGGLE_ADD_BOOK_MODAL]: (state, value) => {
    state.addBookModalVisible = value
  },
  [ADDING_OR_EDITING_BOOK]: (state, value) => {
    state.addingOrEditingBook = value
  },
  [SHOW_NOTIFICATION]: (state, value) => {
    state.showNotification = value
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
