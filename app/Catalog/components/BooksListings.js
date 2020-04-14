import React from 'react';
import {Card, CardActions, CardContent, CardMedia, CssBaseline, Button, IconButton, Typography, Container, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ShoppingCart} from '@material-ui/icons';

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'

//Actions
import { addBookToOrder } from '../../Client/redux/clientActions'

//Custom components
import BookCard from './BookCard';
import CustomModal from './BookCoverModal';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', 
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))
/**
 * Render action buttons depending on the user
 * @param {*} book 
 * @param {*} props 
 */
export const renderButtons=(book, props)=> {
  return props.history.location.pathname.includes('admin') ? (
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
):(
<React.Fragment>
    <Button size="small" color="primary" onClick={()=>props.history.push(`/client/catalog/${book.bookID}`)}>View</Button>
    <IconButton aria-label="add" onClick={async()=> props.addBookToOrder(book.bookID, book.title, book.bookCover)}>
      <ShoppingCart />
    </IconButton>
</React.Fragment>
)}

function CatalogComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)
  const [currentBook, setCurrentBook] = React.useState(null)

  const handleOpen = (book) => {
    setCurrentBook(book)
    setOpen(true)
  };

  const handleClose = () => {
    setCurrentBook(null)
    setOpen(false);
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Catalog
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.books.map((book) => (
              <Grid item key={book.bookID} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={book.bookCover}
                    title={book.title}
                    onClick={()=>handleOpen(book)}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book.title}
                    </Typography>
                    <Typography>
                      This book was written by {book.author} and was first published on {book.publicationDate}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {renderButtons(book, props)}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <CustomModal open={open} handleClose={handleClose}>
        <BookCard book={currentBook}/>
      </CustomModal>
    </React.Fragment>
  )
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
 
 export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogComponent))
