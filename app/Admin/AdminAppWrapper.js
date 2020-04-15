import React from 'react'
import asyncComponent from '../AsyncComponent'
import MainAppLayout from '../AppLayout/MainAppLayout'

import { Route, Switch } from 'react-router-dom'

const OrdersListing = asyncComponent(()=>import('./components/OrdersListing' /* webpackChunkName: "admin/orders" */))
const UsersListing = asyncComponent(()=>import('./components/UsersListing' /* webpackChunkName: "admin/users" */))
const CatalogComponent = asyncComponent(()=>import('../Catalog/components/CatalogComponent' /* webpackChunkName: "admin/catalog" */))
const BookDetails = asyncComponent(()=>import('../Catalog/components/BookDetails' /* webpackChunkName: "admin/book-details" */))

export default ({ match }) => (
  <MainAppLayout drawerType='admin'>
    <Switch>
      <Route component={OrdersListing} exact path={`${match.path}/orders`} />
      <Route component={UsersListing} exact path={`${match.path}/users`} />
      <Route component={CatalogComponent} exact path={`${match.path}/catalog`} />
      <Route component={BookDetails} exact path={`${match.path}/catalog/:bookID`} />
    </Switch>
    </MainAppLayout>
)
