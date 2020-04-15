import React from 'react'

// Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { getAllUsers } from "../redux/adminActions"

// Custom components
import UsersTable from './UsersTable'
import TitleComponent from '../../SharedComponents/TitleComponent'
import LoadingComponent from '../../SharedComponents/LoadingComponent'

/**
 * Component for displaying all users
 */
class UsersListing extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <TitleComponent title="Bookstore User" />
        {this.props.admin.fetchingAllUsers ? (
          <LoadingComponent />
        ) : (
          <UsersTable users={Object.values(this.props.admin.users)} />
        )}
      </div>
    )
  }
}

// ==================================================================================================
const mapStateToProps = (state) => ({
  admin: state.admin,
  user: state.user,
})

// ==================================================================================================
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(
      {
        getAllUsers,
      },
      dispatch
    ),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersListing)
