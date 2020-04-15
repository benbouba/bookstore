import React from "react"
import { Container, Typography } from '@material-ui/core'

// Action creators
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

// Custom components
import OrderListComponent from "../../SharedComponents/OrdersListComponent"
import TitleComponent from "../../SharedComponents/TitleComponent"

class OrdersListing extends React.Component {
  render() {
    const { orders } = this.props.admin
    const asArrayOrders = Object.values(orders)
    return (
      <Container>
        <TitleComponent title={"Clients' orders"} />
        {asArrayOrders.length > 0 &&
          asArrayOrders.map((clientOrders, index) => {
            const ordersArray = Object.values(clientOrders.orders)
            return (
              <Container key={index}>
                <Typography gutterBottom>{clientOrders.owner.name}</Typography>
                <OrderListComponent
                  owner={clientOrders.owner}
                  orders={ordersArray}
                />
              </Container>
            )
          })}
      </Container>
    )
  }
}

// ==================================================================================================
const mapStateToProps = (state) => ({
  admin: state.admin,
})

// ==================================================================================================
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({}, dispatch),
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListing)
