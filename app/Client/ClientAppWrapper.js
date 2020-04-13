import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from '../AsyncComponent'
import MainAppLayout from '../AppLayout/MainAppLayout'
const Orders = asyncComponent(()=>import('./components/Orders' /* webpackChunkName: "client/orders" */))
const OrderDetails = asyncComponent(()=>import('./components/OrderDetails' /* webpackChunkName: "ckient/order-details" */))
const HomePage = asyncComponent(()=>import('../User/components/HomePage' /* webpackChunkName: "client/home" */))

export default ({ match }) => (
  <MainAppLayout drawerType='admin'>
    <Switch>
      <Route component={Orders} exact path={`${match.path}/orders`} />
      <Route component={OrderDetails} exact path={`${match.path}/orders/:orderID`} />
      <Route component={HomePage} exact path={`${match.path}/home`} />    
    </Switch>
  </MainAppLayout>
)
