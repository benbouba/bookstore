import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

//Route components
import ClientAppWrapper from './Client/ClientAppWrapper'
import AdminAppWrapper from './Admin/AdminAppWrapper'
import LoginPage from './User/components/LoginPageWrapper'
import CatalogListing from './Catalog/components/CatalogListing'

// Action creator
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import {getCurrentLoggedInUser} from './User/redux/userActions'
import {getOrders } from './Client/redux/clientActions'
import {getAllBooks} from './Catalog/redux/catalogActions'


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
    if(currentUserData && currentUserData.role === 'client'){
      await this.props.getOrders()
    }
  }
  render(){ 
    return(
    <BrowserRouter >  
      <Switch>
        <Route exact component={CatalogListing} path={`/home`}></Route>    
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
  catalog: state.catalog
 })
 
 // ==================================================================================================
 function mapDispatchToProps (dispatch) {
   
   return {
     ...bindActionCreators({
        getAllBooks,
        getOrders,
        getCurrentLoggedInUser
     }, dispatch),
     dispatch
   }
 }
 
export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes)