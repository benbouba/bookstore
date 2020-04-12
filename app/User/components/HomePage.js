import React from 'react'
import Button from '@material-ui/core/Button'

import {getAllBooks} from '../../store/catalogActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BooksListing from './BooksListings'
class HomePage extends React.Component {
  constructor(props){
    super(props)
    if(props.catalog.books.length === 0){
      props.getAllBooks()
    }
  }
    render() {
        return(
            <div>
                <BooksListing books={this.props.catalog.books}/>
            </div>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   catalog: state.catalog
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
  