import RestService from '../../RestServices'

//Types
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS'
export const ADD_BOOKS_TO_STORAGE = 'ADD_BOOKS_TO_STORAGE'
export const SET_CURRENT_BOOK = 'SET_CURRENT_BOOK'

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
    let booksInStorage = await RestService('GET', {}, 'bookstore-catalog')
    if (!booksInStorage) {
        booksInStorage = await RestService('POST', books, 'bookstore-catalog')
    }
    dispatch({
        type: ADD_BOOKS_TO_STORAGE,
        payload: booksInStorage
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