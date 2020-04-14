import React from 'react'
import {withRouter} from 'react-router-dom'

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import {getAllBooks} from '../redux/catalogActions'

//Custom components
import BooksListing from './BooksListings'

class CatalogListing extends React.Component {
  constructor(props){
    super(props)
  }
    render() {
        return(
            <div>
                <BooksListing books={this.props.catalog.books} />
            </div>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   catalog: state.catalog,
   user: state.user
  })
  
  // ==================================================================================================
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({
        getAllBooks
      }, dispatch),
      dispatch
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogListing))
  