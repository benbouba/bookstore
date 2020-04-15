import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, CircularProgress} from '@material-ui/core';

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {addBookToCatalog, editBookProperty, toggleEditBookModal, toggleAddBookModal, toggleShowNotification} from '../redux/catalogActions'


class AddOrEditBookForm extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
            title: '',
            author: '',
            publicationDate: '',
            quantity: 1,
        }
    }
    componentDidMount(){
      const {book} = this.props
      if(book){
        Object.keys(book).forEach(key=>{
          this.setState({[key]: book[key]})
        })
      }
    }
    handleInputChange=(event)=> {
        event.preventDefault()
        const {value, name } = event.target
        this.setState({
            [name]: value
        })
        }
    handleSubmit=async(event)=>{
        event.preventDefault()
        event.persist()
        const {title, author, publicationDate, quantity, bookID} = this.state
        const newBookData = {title, author, publicationDate, quantity}
        if(bookID){
          await this.props.editBookProperty(bookID, newBookData)
          this.props.toggleEditBookModal(false)
        }else{
          await this.props.addBookToCatalog(newBookData)
          this.props.toggleAddBookModal(false)
        }
        this.props.toggleShowNotification(true)
    }
  render(){
  return (
    <div>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            {this.props.catalog.addingOrEditingBook && <CircularProgress />}
        </Typography>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
             {this.props.book? this.props.book.title: 'New Book'}
        </Typography>
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="outlined-full-width"
          label="Title"
          name='title'
          value={this.state.title}
          style={{ margin: 8 }}
          placeholder="The Raven"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleInputChange}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Author"
          name='author'
          value={this.state.author}
          style={{ margin: 8 }}
          placeholder="Edgar Allan Poe"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleInputChange}
          variant="outlined"
        />
        <TextField
          id="outlined-full-width"
          label="Publication date"
          name='publicationDate'
          value={this.state.publicationDate}
          style={{ margin: 8 }}
          placeholder="January, 1 1970"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.handleInputChange}
          variant="outlined"
        />
        <TextField
          label="Quantity"
          id="outlined-margin-none"
          name='quantity'
          value={this.state.quantity}
          variant="outlined"
          style={{ margin: 8 }}
          onChange={this.handleInputChange}
        />
        <Button size='large' fullWidth variant="contained" color="primary" type="submit">Save</Button>
      </form>
    </div>
  );}
}

// ==================================================================================================
const mapStateToProps = state => ({
    catalog: state.catalog,
   })
   
   // ==================================================================================================
   function mapDispatchToProps (dispatch) {
     return {
       ...bindActionCreators({
        addBookToCatalog,
        editBookProperty,
        toggleEditBookModal,
        toggleAddBookModal,
        toggleShowNotification
       }, dispatch),
       dispatch
     }
   }
   
   export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditBookForm)
  