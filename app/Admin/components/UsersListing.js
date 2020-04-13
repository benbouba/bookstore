import React from 'react'
import {getAllUsers} from '../redux/adminActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UsersTable from './UsersTable'
class UsersListing extends React.Component {
  constructor(props){
    super(props)
    if(Object.keys(props.admin.users).length === 0){
      props.getAllUsers()
    }
  }
    render() {
        return(
            <div>
                <h1>Users Listing</h1>
                <UsersTable users={Object.values(this.props.admin.users)}/>
            </div>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   admin: state.admin
  })
  
  // ==================================================================================================
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({
        getAllUsers
      }, dispatch),
      dispatch
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UsersListing)
  