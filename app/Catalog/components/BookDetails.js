import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, CardMedia,Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';

//Action Creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'
//Actions
import {addBookToOrder} from '../../Client/redux/clientActions'

const useStyles = makeStyles({
  root: {
    maxWidth: 'auto',
  },
  media: {
    height: 400,
  },
});
/**
 * Component for displaying book details
 * @param {*} props 
 */
function BookDetails(props) {
  const classes = useStyles();
  const {books} = props.catalog
  const {bookID} = useParams()
  const bookData = books.length !==0 ? books.filter(book=> book.bookID === bookID)[0] : {}
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
        <Button size="small" color="primary" onClick={async()=> props.addBookToOrder(bookData.bookID, bookData.title, bookData.bookCover)}>
          Add to Cart
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

// ==================================================================================================
const mapStateToProps = state => ({
  catalog: state.catalog,
 })
 
 // ==================================================================================================
 function mapDispatchToProps (dispatch) {
   return {
     ...bindActionCreators({
      addBookToOrder
     }, dispatch),
     dispatch
   }
 }
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetails))
