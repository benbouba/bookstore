import React from 'react'
import { Route, Switch } from 'react-router-dom'
import OrdersListing from './components/OrdersListing'
import UsersListing from './components/UsersListing'
import HomePage from '../User/components/HomePage'
export default ({ match }) => (
    <Switch>
      <Route component={OrdersListing} exact path={`${match.path}/orders`} />
      <Route component={UsersListing} exact path={`${match.path}/users`} />
      <Route component={HomePage} exact path={`${match.path}/home`} />
    </Switch>
)
