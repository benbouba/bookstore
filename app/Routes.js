import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

import ClientAppWrapper from './Client/ClientAppWrapper'
import AdminAppWrapper from './Admin/AdminAppWrapper'

import LoginPage from './User/components/LoginPageWrapper'
import HomePage from './User/components/HomePage'

//  App routes
const AppRoutes = () => (
<BrowserRouter >  
<Switch>
      <Route exact component={HomePage} path={`/home`}></Route>    
      <Route exact component={LoginPage} path={`/`}></Route>
 
      <Route component={AdminAppWrapper} path={`/admin`} />
      <Route component={ClientAppWrapper} path={`/client`} />
      </Switch>
  </BrowserRouter>
)
export default AppRoutes