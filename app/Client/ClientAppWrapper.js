import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from '../AsyncComponent'
import MainAppLayout from '../AppLayout/MainAppLayout'
const ClientOrders = asyncComponent(()=>import('./components/ClientOrders' /* webpackChunkName: "client/orders" */))
const CatalogListing = asyncComponent(()=>import('../Catalog/components/CatalogListing' /* webpackChunkName: "client/catalog" */))
const BookDetails = asyncComponent(()=>import('../Catalog/components/BookDetails' /* webpackChunkName: "client/book-details" */))

export default ({ match }) => (
  <MainAppLayout drawerType='client'>
    <Switch>
      <Route component={ClientOrders} exact path={`${match.path}/orders`} />
      <Route component={BookDetails} exact path={`${match.path}/catalog/:bookID`} />
      <Route component={CatalogListing} exact path={`${match.path}/catalog`} />    
    </Switch>
  </MainAppLayout>
)
