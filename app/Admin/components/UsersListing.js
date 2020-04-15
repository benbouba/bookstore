import React from 'react'
import {getAllUsers} from '../redux/adminActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UsersTable from './UsersTable'
import TitleComponent from '../../SharedComponents/TitleComponent'
import LoadingComponent from '../../SharedComponents/LoadingComponent'

class UsersListing extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
        return (
            <div>
                <TitleComponent title='Bookstore User' />
                {this.props.admin.fetchingAllUsers ? 
                <LoadingComponent/>:
                <UsersTable users={Object.values(this.props.admin.users)}/>}
            </div>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   admin: state.admin,
   user: state.user
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
  