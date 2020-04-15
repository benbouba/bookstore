import RestService from '../../RestServices'
export const USER_SAYS_HELLO = 'user.USER_SAYS_HELLO'
export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const sayHello = () => ({
  type: USER_SAYS_HELLO,
  payload: "Hello World from User",
})

export const loginUser = (username, password) => async (dispatch) => {
  const currentUser = await RestService.getCurrentUser(username, password)
  if (currentUser) {
    dispatch({
      type: LOGIN_USER,
      payload: currentUser,
    })
    return currentUser
  }
}
export const getCurrentLoggedInUser = () => async (dispatch) => {
  const currentUser = await RestService.getCurrentUser()
  if (currentUser) {
    dispatch({
      type: LOGIN_USER,
      payload: currentUser,
    })
  }
}
export const logoutUser = () => async (dispatch) => {
  await RestService("DELETE", {}, "currentUser")
  dispatch({ type: LOGOUT_USER })
}

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
})
