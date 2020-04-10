import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Orders from './components/Orders'
import OrderDetails from './components/OrderDetails'

export default ({ match }) => (
    <Switch>
      <Route component={Orders} exact path={`${match.path}/orders`} />
      <Route component={OrderDetails} exact path={`${match.path}/orders/:orderID`} />
    </Switch>
)
