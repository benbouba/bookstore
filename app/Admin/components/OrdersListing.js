import React from 'react'
import {sayHello} from '../redux/adminActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class OrdersListing extends React.Component {
    render() {
        return(
            <div>
                <h1>Orders Listing</h1>
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
        sayHello
      }, dispatch),
      dispatch
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrdersListing)
  