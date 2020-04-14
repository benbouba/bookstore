import React from 'react'
import {sayHello} from '../redux/adminActions'
import {Container, Typography} from '@material-ui/core'
import { } from '@material-ui/icons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import OrderListComponent from '../../SharedComponents/OrdersListComponent'

class OrdersListing extends React.Component {
  
    render() {
      const {orders} = this.props.admin
      const asArrayOrders = Object.values(orders)
        return(
          <Container>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Client orders
            </Typography> 
            {asArrayOrders.length > 0 && asArrayOrders.map((clientOrders, index)=>{
              const ordersArray = Object.values(clientOrders.orders)
              console.log(clientOrders.owner)
              return(
                <Container key={index}>
                  <Typography gutterBottom>
                    {clientOrders.owner.name}
                  </Typography> 
                  <OrderListComponent owner={clientOrders.owner} orders={ordersArray} />
                </Container>
              )
              
            })
            }
        </Container>
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
  