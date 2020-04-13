import React from 'react'
import Button from '@material-ui/core/Button'

import {getAllBooks} from '../../store/catalogActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'
import BooksListing from './BooksListings'
class HomePage extends React.Component {
  constructor(props){
    super(props)
    if(props.catalog.books.length === 0){
      props.getAllBooks()
    }
  }
  renderButtons(){
    if(this.props.history.location.pathname.includes('admin')){
      return(
        <React.Fragment>
          <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                    <Button size="small" color="primary">
                      Remove Book
                    </Button>
        </React.Fragment>
      )
    }
    return(
      <React.Fragment>
          <Button size="small" color="primary">View</Button>
          <Button size="small" color="primary">Add to cart</Button>
      </React.Fragment>
    )
  }
    render() {
        return(
            <div>
                <BooksListing books={this.props.catalog.books}>
                  {this.renderButtons()}
                </BooksListing>
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
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))
  