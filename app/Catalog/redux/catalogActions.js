import RestService from '../../RestServices'
import uniqid from 'uniqid'

//Types
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const ADD_BOOKS_TO_STORAGE = 'ADD_BOOKS_TO_STORAGE'
export const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'
export const UPDATE_BOOK_PROPERTY = 'UPDATE_BOOK_PROPERTY'
export const ADD_NEW_BOOK = 'ADD_NEW_BOOK'
export const FETCHING_CATALOG = 'FETCHING_CATALOG'

export const defaultCover = 'https://bookstore-catalog.s3.amazonaws.com/cover.png'

/** 
 * Set currently selected book for display in modal
 * @param {Id of the book} bookID 
 */
export const setCurrentBook = (bookID)=>({
    type: SET_CURRENT_BOOK, 
    payload: bookID
})
/**
 * Load all books from local storage
 */
export const getAllBooks = () => async (dispatch) => {
    dispatch({
        type: FETCHING_CATALOG,
        payload: true
    })
    let booksInStorage = await RestService('GET', {}, 'bookstore-catalog')

    if (!booksInStorage || booksInStorage.length === 0) {
        booksInStorage = await RestService('POST', books, 'catalog')
    }
    dispatch({
        type: FETCHING_CATALOG,
        payload: false
    })
    dispatch({
        type: ADD_BOOKS_TO_STORAGE,
        payload: booksInStorage
    })
    
}

export const removeBookFromCatalog=(bookID)=>async(dispatch, getState)=>{
    let booksInStorage = await RestService('GET', {}, 'bookstore-catalog')
    const currentBookIndex = booksInStorage.findIndex(book=> book.bookID === bookID)
    if(currentBookIndex > -1){
        booksInStorage.splice(currentBookIndex, 1)
    }
    const responseData = await RestService('POST', booksInStorage, 'catalog')
    dispatch({
        type: REMOVE_BOOK,
        payload: responseData
    })
}
export const editBookProperty=(bookID, propertyKey, value)=>async(dispatch, getState)=>{
    let booksInStorage = await RestService('GET', {}, 'bookstore-catalog')
    const currentBookIndex = booksInStorage.findIndex(book=> book.bookID === bookID)
    if(currentBookIndex > -1){
        booksInStorage[currentBookIndex][propertyKey]= value
    }
    const responseData = await RestService('POST', booksInStorage, 'catalog')
    dispatch({
        type: UPDATE_BOOK_PROPERTY,
        payload: responseData
    })
}

export const addBook=(bookData)=>async(dispatch)=>{
    let booksInStorage = await RestService('GET', {}, 'bookstore-catalog')
    const newBook = {
        ...bookData,
        bookID: uniqid('book-'),
        bookCover: defaultCover
    }
    booksInStorage.push(newBook)
    const responseData = await RestService('POST', booksInStorage, 'catalog')
    dispatch({
        type: ADD_NEW_BOOK,
        payload: responseData
    })
}

//Books for seeding
const books = [{
        bookID: 'book001',
        title: 'The Raven',
        author: 'Edgar Alan Poe',
        publicationDate: 'January 1845',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/the+raven.jpg',
        quantity: 15
    },
    {
        bookID: 'book002',
        title: 'Annabele Lee',
        author: 'Edgar Alan Poe',
        publicationDate: 'October 9, 1849',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/anabel+lee.jpg',
        quantity: 3
    },
    {
        bookID: 'book007',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        publicationDate: 'January 28, 1813',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/pride.jpg',
        quantity: 100
    },
    {
        bookID: 'book008',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        publicationDate: 'July 11, 1960',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/mockingbird.jpg',
        quantity: 150
    },
    {
        bookID: 'book003',
        title: 'Frankenstein',
        author: 'Mary Shelley',
        publicationDate: '1 January 1818',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/frankie.jpeg',
        quantity: 10
    },
    {
        bookID: 'book004',
        title: 'Nineteen Eighty-Four',
        author: 'George Orwell',
        publicationDate: '8 June 1949',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/1984.jpg',
        quantity: 0
    },
    {
        bookID: 'book005',
        title: 'Alice\'s Adventures in Wonderland',
        author: 'Lewis Carroll',
        publicationDate: 'November 26, 1865',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/alice.jpg',
        quantity: 9
    },
    {
        bookID: 'book006',
        title: 'Moby Dick or The Whale',
        author: 'Herman Melville',
        publicationDate: 'October 18, 1851',
        bookCover: 'https://bookstore-catalog.s3.amazonaws.com/moby.jpg',
        quantity: 120
    },
]