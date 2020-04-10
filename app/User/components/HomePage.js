import React from 'react'
import Button from '@material-ui/core/Button'

import {sayHello} from '../redux/userActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class HomePage extends React.Component {
    render() {
        return(
            <div>
                <Button variant="contained" color="primary">
      Hello World
    </Button>

            </div>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   admin: state.admin
  })
  
  // ==================================================================================================
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({
        sayHello
      }, dispatch),
      dispatch
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
  