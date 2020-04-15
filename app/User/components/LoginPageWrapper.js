import React from 'react'
import {Backdrop, CircularProgress} from '@material-ui/core';

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import {getCurrentLoggedInUser, loginUser} from '../redux/userActions'
import {getAllUsers} from '../../Admin/redux/adminActions'
//Custom componets
import LoginForm from './LoginForm'

class LoginPageWrapper extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }
  //Check if there is a user login and log them in
  async componentWillMount (){
    await this.props.getCurrentLoggedInUser()
    if(this.props.user.currentUserData){
      if (this.props.user.currentUserData.role === 'admin') {
        this.props.history.push(`/admin/catalog`)
        await this.props.getAllUsers()
      }else{
        this.props.history.push(`/client/catalog`)
      }
    }
  }
  //function to login user
  login=async (event)=>{
    event.preventDefault()
    const {username, password} = event.target
    this.setState({loading: true})
    const user = await this.props.loginUser(username.value, password.value)
    this.setState({loading: false})
    if (user.role === 'admin') {
      this.props.history.push(`/admin/catalog`)
      await this.props.getAllUsers()
    }else{
      this.props.history.push(`/client/catalog`)
    }
  }
  
    render() {
        return(
          <div>
            <LoginForm onSubmit={this.login}/> 
            <Backdrop open={this.state.loading}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
            
        )
    }
}
// ==================================================================================================
const mapStateToProps = state => ({
    user: state.user
   })
   
   // ==================================================================================================
   function mapDispatchToProps (dispatch) {
     return {
       ...bindActionCreators({
        getCurrentLoggedInUser,
         loginUser,
         getAllUsers
       }, dispatch),
       dispatch
     }
   }
 

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageWrapper)