import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OrdersListing from './components/OrdersListing'
import UsersListing from './components/UsersListing'

export default ({ match }) => (
    <Switch>
      <Route component={OrdersListing} exact path={`${match.path}/orders`} />
      <Route component={UsersListing} exact path={`${match.path}/users`} />
    </Switch>
)
