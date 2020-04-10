import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// reducers
import adminReducer from '../Admin/redux/adminReducer'
import clientReducer from '../Client/redux/clientReducer'
import userReducer from '../User/redux/userReducer'

const  appReducer =(history)=> combineReducers({
      router: connectRouter(history),
      admin: adminReducer,
      client: clientReducer,
      user: userReducer
    })
export default appReducer

