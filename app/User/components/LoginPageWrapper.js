import React from 'react'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {getCurrentLoggedInUser, loginUser} from '../redux/userActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from './LoginForm'

class LoginPageWrapper extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }
  async componentWillMount (){
    await this.props.getCurrentLoggedInUser()
    if(this.props.user.currentUserData){
      if (this.props.user.currentUserData.role === 'admin') {
        this.props.history.push(`/admin/home`)
      }else{
        this.props.history.push(`/client/home`)
      }
    }
  }
  login=async (event)=>{
    event.preventDefault()
    console.log(this.props.user)
    const {username, password} = event.target
    this.setState({loading: true})
    const user = await this.props.loginUser(username.value, password.value)
    this.setState({loading: false})
    if (user.role === 'admin') {
      this.props.history.push(`/admin/home`)
    }else{
      this.props.history.push(`/client/home`)
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
         loginUser
       }, dispatch),
       dispatch
     }
   }
 

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageWrapper)