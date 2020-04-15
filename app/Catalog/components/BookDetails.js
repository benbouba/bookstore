import React from 'react';
import {IconButton, Snackbar, Card, CardActionArea, CardActions, CardContent, CardMedia,Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import {Alert, AlertTitle} from '@material-ui/lab'
import {Delete} from '@material-ui/icons'
//Action Creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'
//Actions
import {addBookToOrder} from '../../Client/redux/clientActions'
import { removeBookFromCatalog, toggleEditBookModal, toggleShowNotification} from '../redux/catalogActions'

//Custom components
import CustomModal from '../../SharedComponents/CustomModal';
import AddOrEditBookForm from './AddOrEditBookForm'

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto',
  },
  media: {
    height: 400,
  },
});
const renderButtons = (props, book, showModalFunction) =>{
  const {currentUserData} = props.user
  if(currentUserData && currentUserData.role === 'admin'){
    return (
      <React.Fragment>
        <Button size="small" color="primary" onClick={()=>showModalFunction(book)}>
          Edit
        </Button>
        <IconButton aria-label="Remove" color="secondary"
          onClick={async()=> {
            props.history.push('/admin/catalog')
            await props.removeBookFromCatalog(book.bookID)
            }}>
          <Delete />
        </IconButton>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Button size="small" color="primary" onClick={async()=> props.addBookToOrder(bookData.bookID, bookData.title, bookData.bookCover)}>
          Add to Cart
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
    </React.Fragment>
  )
}
/**
 * Component for displaying book details
 * @param {*} props 
 */
function BookDetails(props) {
  const classes = useStyles();
  const {books} = props.catalog
  const {bookID} = useParams()
  const bookData = books.length !==0 ? books.filter(book=> book.bookID === bookID)[0] : {}
  const [currentBook, setCurrentBook] = React.useState()
  const handleOpenEditBookModal =(book)=>{
    setCurrentBook(book)
    props.toggleEditBookModal(true)
  }
  const handleCloseEditBookModal =()=>{
    setCurrentBook(null)
    props.toggleEditBookModal(false)
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={bookData.bookCover || ''}
          title={bookData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {bookData.title}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6">
            {bookData.author}
          </Typography>
          <Typography gutterBottom component="h6">
            {bookData.publicationDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled 
          it to make a type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. 
          It was popularised in the 1960s with the release of Letraset sheets containing 
          Lorem Ipsum passages, and more recently with desktop publishing software 
          like Aldus PageMaker including versions of Lorem Ipsum.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {renderButtons(props, bookData, handleOpenEditBookModal)}
      </CardActions>
      <CustomModal open={props.catalog.editBookModalVisible} handleClose={handleCloseEditBookModal}>
        <AddOrEditBookForm book={currentBook}/>
      </CustomModal>
      <Snackbar 
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={props.catalog.showNotification} autoHideDuration={4000} onClose={()=>props.toggleShowNotification(false)}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          The book details have been updated successfully
        </Alert>
      </Snackbar>
    </Card>
  );
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
      addBookToOrder,
      removeBookFromCatalog,
      toggleEditBookModal,
      toggleShowNotification
     }, dispatch),
     dispatch
   }
 }
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetails))
