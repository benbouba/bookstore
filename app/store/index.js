import { combineReducers } from 'redux'

// reducers
import adminReducer from '../Admin/redux/adminReducer'
import clientReducer from '../Client/redux/clientReducer'
import userReducer from '../User/userReducer'



const  appReducer = combineReducers({
      admin: adminReducer,
      client: clientReducer,
      user: userReducer
    })
export default appReducer

