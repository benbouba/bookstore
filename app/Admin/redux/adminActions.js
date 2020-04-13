import RestService, {bookstoreUsers} from "../../helpers/RestServices"

export const GET_ALL_USERS = 'GET_ALL_USERS'

export const getAllUsers =()=>async(dispatch)=>{
    let users = await RestService('GET', {}, 'bookstore-users')
    if(!users){
        users = bookstoreUsers
        await RestService('POST', bookstoreUsers, 'bookstore-users')  
    }
    dispatch({
        type: GET_ALL_USERS,
        payload: users
    })
}