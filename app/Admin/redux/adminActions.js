import RestService, {bookstoreUsers} from "../../RestServices"

//Types
export const GET_ALL_USERS = 'GET_ALL_USERS'

/**
 * Get all users and fetch all user orders
 */
export const getAllUsers =()=>async(dispatch)=>{
    let users = await RestService('GET', {}, 'bookstore-users')
    let orders = []
    if(!users){
        users = bookstoreUsers
        await RestService('POST', bookstoreUsers, 'bookstore-users')  
    }else{
        await Object.values(users).asyncForEach(async(user)=>{
            if(user.role !== 'admin'){
                const userOrders = await RestService('GET', {}, `bookstore-${user.userID}-orders`)
                if(orders){
                    orders.push({
                        owner: user.userID,
                        orders: userOrders
                    })
                }
                
            }
        })
    }
    dispatch({
        type: GET_ALL_USERS,
        payload: {users, orders}
    })
}