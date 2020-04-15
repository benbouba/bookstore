import React from 'react'
import { Route, Switch } from 'react-router-dom'
import asyncComponent from '../AsyncComponent'
import MainAppLayout from '../AppLayout/MainAppLayout'
const ClientOrders = asyncComponent(()=>import('./components/ClientOrders' /* webpackChunkName: "client/orders" */))
const CatalogComponent = asyncComponent(()=>import('../Catalog/components/CatalogComponent' /* webpackChunkName: "client/catalog" */))
const BookDetails = asyncComponent(()=>import('../Catalog/components/BookDetails' /* webpackChunkName: "client/book-details" */))

export default ({ match }) => (
  <MainAppLayout drawerType='client'>
    <Switch>
      <Route component={ClientOrders} exact path={`${match.path}/orders`} />
      <Route component={BookDetails} exact path={`${match.path}/catalog/:bookID`} />
      <Route component={CatalogComponent} exact path={`${match.path}/catalog`} />    
    </Switch>
  </MainAppLayout>
)
