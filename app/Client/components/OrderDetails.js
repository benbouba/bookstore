import React from 'react'
import {sayHello} from '../redux/clientActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class OrderDetails extends React.Component {
    render() {
        return(
            <div>
                <h1>Order Details</h1>
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
  