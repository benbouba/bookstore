import RestService, {bookstoreUsers} from "../../RestServices"

//Types
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

/**
 * Get all users and fetch all user orders
 */
export const getAllUsers =()=>async(dispatch)=>{
    let users = await RestService('GET', {}, 'bookstore-users')
    let orders = {}
    if(!users){
        users = bookstoreUsers
        await RestService('POST', bookstoreUsers, 'bookstore-users')  
    }else{
        await Object.values(users).asyncForEach(async(user)=>{
            if(user.role !== 'admin'){
                const userOrders = await RestService('GET', {}, `bookstore-${user.userID}-orders`)
                if(userOrders){
                    orders[user.userID] = {
                        owner: {userID: user.userID, name: `${user.name} ${user.surname}`},
                        orders: userOrders
                    }
                }
                
            }
        })
    }
    dispatch({
        type: GET_ALL_USERS,
        payload: {users, orders}
    })
}

export const updateOrderStatus=(orderID, ownerID, status)=> async(dispatch)=>{
    let userOrders = await RestService('GET', {}, `bookstore-${ownerID}-orders`)
    userOrders[orderID].orderStatus = status
    userOrders = await RestService('POST', userOrders, `${ownerID}-orders`)
    dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: {ownerID, orders: userOrders}
    })
}