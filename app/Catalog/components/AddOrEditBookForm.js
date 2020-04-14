import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Snackbar, Typography, TextField, Button} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {addBook} from '../redux/catalogActions'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class AddOrEditBookForm extends React.Component {
  
    constructor(props){
        super(props)
        this.state = {
            title: '',
            author: '',
            publicationDate: '',
            quantity: '',
            showNotification: false
        }
    }
    handleCloseNotification(){
      this.setState({showNotification: false})
    }
    handleInputChange=(event)=> {
        event.preventDefault()
        const {value, name } = event.target
        this.setState({
            [name]: value
        })
        }
    handleSubmit=async (event)=>{
        event.preventDefault()
        const {title, author, publicationDate, quantity} = this.state
        const newBook = {title, author, publicationDate, quantity}
        await this.props.addBook(newBook)
        this.setState({showNotification: true})
        event.target.reset()
    }
  render(){
  return (
    <div>
        <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
              New Book
        </Typography>
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="outlined-full-width"
          label="Title"
          name='title'
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
          defaultValue={1}
          variant="outlined"
          style={{ margin: 8 }}
          onChange={this.handleInputChange}
        />
        <Button size='large' fullWidth variant="contained" color="primary" type="submit">Save</Button>
      </form>
      <Snackbar open={this.state.showNotification} autoHideDuration={4000} onClose={this.handleCloseNotification}>
        <Alert onClose={this.handleCloseNotification} severity="success">
          Book has been Added successfully!
        </Alert>
      </Snackbar>
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
        addBook,
       }, dispatch),
       dispatch
     }
   }
   
   export default connect(mapStateToProps, mapDispatchToProps)(AddOrEditBookForm)
  