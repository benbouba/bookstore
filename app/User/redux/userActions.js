import RestService from '../../helpers/RestServices'
export const USER_SAYS_HELLO = 'user.USER_SAYS_HELLO'
export const LOGIN_USER = 'LOGIN_USER'

export const sayHello =()=>({
    type: USER_SAYS_HELLO,
    payload: 'Hello World from User'
})

export const loginUser =(username, password)=>async(dispatch)=>{
    const currentUser = await RestService.getCurrentUser(username, password)
    if(currentUser){
        dispatch({
            type: LOGIN_USER,
            payload: currentUser
        })
        return currentUser
    }   
}
export const getCurrentLoggedInUser =()=> async(dispatch)=>{
    const currentUser = await RestService.getCurrentUser()
    if(currentUser){
        dispatch({
            type: LOGIN_USER,
            payload: currentUser
        })
    }
}