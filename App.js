import React from 'react'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import createRootReducer from './app/store/index'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import Routes from './app/Routes'

export const history = createBrowserHistory()

// only use the compose enhancer if available
const composeEnhancer = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }))
  || compose

const store = createStore(createRootReducer(history), composeEnhancer(applyMiddleware(thunk)))

export default class App extends React.Component{
    render(){
        return(
            <Provider store={store}>
             <Routes />
            </Provider>
        )
    }
}