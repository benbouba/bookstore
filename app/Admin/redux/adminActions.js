import RestService, { bookstoreUsers } from "../../RestServices"

// Types
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'
export const FETCHING_ALL_USERS = 'FETCHING_ALL_USERS'

/**
 * Get all users and fetch all user orders
 */
export const getAllUsers = () => async (dispatch) => {
  dispatch({
    type: FETCHING_ALL_USERS,
    payload: true,
  })
  let users = await RestService("GET", {}, "bookstore-users")
  const orders = {}
  if (!users) {
    users = bookstoreUsers
    await RestService("POST", bookstoreUsers, "bookstore-users")
  } else {
    await Object.values(users).asyncForEach(async (user) => {
      if (user.role !== "admin") {
        const userOrders = await RestService(
          "GET",
          {},
          `bookstore-${user.userID}-orders`
        )
        if (userOrders) {
          orders[user.userID] = {
            owner: {
              userID: user.userID,
              name: `${user.name} ${user.surname}`,
            },
            orders: userOrders,
          }
        }
      }
    })
  }
  dispatch({
    type: GET_ALL_USERS,
    payload: { users, orders },
  })
  dispatch({
    type: FETCHING_ALL_USERS,
    payload: false,
  })
}
/**
 * Update the status of a user's order
 * ['cancelled', 'sent']
 * @param {*} orderID
 * @param {*} ownerID
 * @param {*} status
 */
export const updateOrderStatus = (orderID, ownerID, status) => async (
  dispatch
) => {
  let userOrders = await RestService("GET", {}, `bookstore-${ownerID}-orders`)
  userOrders[orderID].orderStatus = status
  userOrders = await RestService("POST", userOrders, `${ownerID}-orders`)
  dispatch({
    type: UPDATE_ORDER_STATUS,
    payload: { ownerID, orders: userOrders },
  })
}
