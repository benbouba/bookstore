import RestService from "../../RestServices"
import uniqid from 'uniqid'

//types
export const GET_CLIENT_ORDERS = 'GET_CLIENT_ORDERS'
export const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART'
export const UPDATE_BOOK_QUANTITY = 'UPDATE_BOOK_QUANTITY'
export const PAY_ORDER = 'PAY_ORDER'
export const CANCEL_ORDER = 'CANCEL_ORDER'
export const REMOVE_BOOK = 'REMOVE_BOOK'
/**
 * Action to load all orders of current client
 */
export const getOrders = () => async (dispatch, getState) => {
    const {
        userID
    } = getState().user.currentUserData
    const orders = await RestService('GET', {}, `bookstore-${userID}-orders`)
    if (orders) {
        dispatch({
            type: GET_CLIENT_ORDERS,
            payload: orders
        })
    } else {
        dispatch({
            type: GET_CLIENT_ORDERS,
            payload: []
        })
    }
}
/**
 * Action to add book to order 
 * @param {ID of the book} bookID 
 * @param {Book title} title 
 * @param {Cover image} bookCover 
 */
export const addBookToOrder = (bookID, title, bookCover) => async (dispatch, getState) => {
    const {
        userID
    } = getState().user.currentUserData
    let orders = await RestService('GET', {}, `bookstore-${userID}-orders`)
    //If there is no open orders create a new one
    if (!orders) {
        const orderID = uniqid('order-')
        orders = {
            [orderID]: {
                orderStatus: 'open',
                orderID,
                books:[{bookID, title, bookCover, quantity: 1}]
            }
        }
    } else {
        //if there is an open order, check if there are books in there
        const openOrderKey = Object.keys(orders).filter(key => orders[key].orderStatus === 'open')[0]
        let openOrderBooks = openOrderKey ? orders[openOrderKey].books : null
        if (openOrderBooks) {
            //check if the book is there and update its quantity
            const currentBookOrderIndex = openOrderBooks.findIndex(book => book.bookID === bookID)
            if (currentBookOrderIndex > -1) {
                openOrderBooks[currentBookOrderIndex] = {
                    ...openOrderBooks[currentBookOrderIndex],
                    quantity: (openOrderBooks[currentBookOrderIndex].quantity + 1)
                }
            } else {
                //if its not there create a new book object and add it to books of the open order
                const currentBookOrder = {
                    bookID,
                    quantity: 1,
                    bookCover,
                    title
                }
                openOrderBooks.push(currentBookOrder)
            }
            orders[openOrderKey].books = openOrderBooks
        } else{
            //if there are no open orders, create new one and add a new book object to it
            const orderID = uniqid('order-')
            orders[orderID] =  {
                orderStatus: 'open',
                orderID,
                books:[{bookID, title, bookCover, quantity: 1}]
            }
        }
    }
    //Save the orders back in the local store
    const ordersResponse = await RestService('POST', orders, `${userID}-orders`)
    //Save to redux store
    dispatch({
        type: ADD_BOOK_TO_CART,
        payload: ordersResponse
    })
}
/**
 * Action to remove a book from an active order
 * @param {Id of the current order} orderID 
 * @param {Id of the book to remove} bookID 
 */
export const removeBook =(orderID, bookID)=>async(dispatch, getState)=>{
    const {
        userID
    } = getState().user.currentUserData
    //Get all orders
    let orders = await RestService('GET', {}, `bookstore-${userID}-orders`)
    //Get the current orfr and check if its open
    if(orders[orderID].orderStatus === 'open'){
        // Remove the book from the order
        const bookIndex = orders[orderID].books.findIndex(book => book.bookID === bookID)
        if (bookIndex > -1 ) {
            orders[orderID].books.splice(bookIndex, 1)
        }
        orders = await RestService('POST', orders, `${userID}-orders`)
        dispatch({
            type: REMOVE_BOOK,
            payload: orders
        })
    }
    
}
/**
 * Action to update quantity of a book in an order
 * Works similar to the action above
 * @param {Id of the order} orderID 
 * @param {Id of the book} bookID 
 * @param {quantity of the book} quantity 
 */
export const changeQuantity = (orderID, bookID, quantity)=>async(dispatch, getState)=>{
    const {
        userID
    } = getState().user.currentUserData
    let orders = await RestService('GET', {}, `bookstore-${userID}-orders`)
    if(orders[orderID].orderStatus === 'open'){
        const bookIndex = orders[orderID].books.findIndex(book => book.bookID === bookID)
        if (bookIndex > -1 ) {
            if(quantity===0){
                orders[orderID].books.splice(bookIndex, 1)
            }
            orders[orderID].books[bookIndex].quantity = quantity
        }
    }
    orders = await RestService('POST', orders, `${userID}-orders`)
    dispatch({
            type: UPDATE_BOOK_QUANTITY,
            payload: orders
    })
}
/**
 * Function to cancel an order
 * @param {Id of the order} orderID 
 */
export const cancelOrder=(orderID)=>async(dispatch, getState)=>{
    const {
        userID
    } = getState().user.currentUserData
    //Get client's orders from local storage
    let orders = await RestService('GET', {}, `bookstore-${userID}-orders`)
    //cancel the current order
    orders[orderID].orderStatus = 'cancelled'
    //save the orders back in local storage
    orders = await RestService('POST', orders, `${userID}-orders`)
    dispatch({
        type: CANCEL_ORDER,
        payload: orders
    })
}
/**
 * Action to set order as paid
 * Similar to the action above
 * @param {ID of the order} orderID 
 */
export const confirmPay=(orderID)=>async(dispatch, getState)=>{
    const {
        userID
    } = getState().user.currentUserData
    let orders = await RestService('GET', {}, `bookstore-${userID}-orders`)
    orders[orderID].orderStatus = 'paid'
    orders = await RestService('POST', orders, `${userID}-orders`)
    dispatch({
        type: PAY_ORDER,
        payload: orders
    })
}