import React from 'react'
import {BrowserRouter, Route, Switch } from 'react-router-dom'

import ClientAppWrapper from './Client/ClientAppWrapper'
import AdminAppWrapper from './Admin/AdminAppWrapper'

import LoginPage from './User/components/LoginForm'
import HomePage from './User/components/HomePage'

//  App routes
const AppRoutes = () => (
<BrowserRouter >  
<Switch>
      <Route exact component={HomePage} path={`/`}></Route>    
      <Route exact component={LoginPage} path={`/login`}></Route>
 
      <Route component={AdminAppWrapper} path={`/admin`} />
      <Route component={ClientAppWrapper} path={`/client-app`} />
      </Switch>
  </BrowserRouter>
)
export default AppRoutes