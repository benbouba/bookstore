import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

//Route components
import ClientAppWrapper from './Client/ClientAppWrapper'
import AdminAppWrapper from './Admin/AdminAppWrapper'
import LoginPage from './User/components/LoginPageWrapper'

// Action creator
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import {getCurrentLoggedInUser} from './User/redux/userActions'
import {getOrders } from './Client/redux/clientActions'
import {getAllBooks} from './Catalog/redux/catalogActions'
import {getAllUsers} from './Admin/redux/adminActions'


//  App routes
class AppRoutes extends React.Component{ 
  constructor(props){
    super(props)
    this.loadUserData()
  }

  loadUserData=async()=>{
    if(this.props.catalog.books.length === 0){
      await this.props.getAllBooks()
    }
    await this.props.getCurrentLoggedInUser()
    const {currentUserData} = this.props.user
    if(currentUserData) {
      if(currentUserData.role === 'client'){
        await this.props.getOrders()
      }
      if(currentUserData.role === 'admin' && Object.keys(this.props.admin.users).length === 0){
        this.props.getAllUsers()
      }}
  }
  render(){ 
    return(
    <BrowserRouter >  
      <Switch>
        <Route exact component={LoginPage} path={`/`}></Route>
        <Route component={AdminAppWrapper} path={`/admin`} />
        <Route component={ClientAppWrapper} path={`/client`} />
        </Switch>
    </BrowserRouter>)
  }
}
// ==================================================================================================
const mapStateToProps = state => ({
  user: state.user,
  catalog: state.catalog,
  admin: state.admin
 })
 
 // ==================================================================================================
 function mapDispatchToProps (dispatch) {
   
   return {
     ...bindActionCreators({
        getAllBooks,
        getOrders,
        getCurrentLoggedInUser,
        getAllUsers
     }, dispatch),
     dispatch
   }
 }
 
export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes)