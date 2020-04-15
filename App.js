import React from "react"
import { createBrowserHistory } from "history"
import { Provider } from "react-redux"
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from './app/store/index'
import Routes from "./app/Routes"

export const history = createBrowserHistory()

// only use the compose enhancer if available
const composeEnhancer = 
(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }))
  || (compose)

export const store = createStore(
  createRootReducer(history),
  composeEnhancer(applyMiddleware(thunk))
)
/**
 * Lets us use asyncForEach inside the app
 */
Object.defineProperty(Array.prototype, "asyncForEach", {
  value(callback) {
    if (typeof callback !== 'function') throw Error('callback must be a function for asyncForEach')
    return Promise.all(this.map(callback))
  },
  configurable: true,
  writable: true,
})
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
