import React, { Component } from 'react'

export default function asyncComponent (importComponent, role = null) {
  class AsyncComponent extends Component {
    constructor (props) {
      super(props)
      this.state = {
        component: null
      }
    }

    async componentDidMount () {
      try {  
        const { default: component } = await importComponent()
        this.setState({
          component
        })
      } catch (e) {
        console.error('AsyncComponent error', e)
        this.setState({
          component: AccessDeniedComponent
        })
      }
    }

    render () {
      const Component = this.state.component
      return Component ? <Component {...this.props} /> : null
    }
  }

  return AsyncComponent
}
