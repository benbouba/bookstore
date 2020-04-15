import React from "react"
import {
 Snackbar, Card, CardActions, CardContent, CardMedia, CssBaseline, Button, IconButton, Typography, Container, Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles"
import { ShoppingCart, Delete } from '@material-ui/icons';
import { Skeleton, Alert, AlertTitle } from '@material-ui/lab';

// Action creators
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withRouter } from 'react-router-dom'

// Actions
import { addBookToOrder } from "../../Client/redux/clientActions"
import {
 removeBookFromCatalog, toggleEditBookModal, toggleAddBookModal, toggleShowNotification } from '../redux/catalogActions'

// Custom components
import BookCard from "./BookCard"
import CustomModal from "../../SharedComponents/CustomModal"
import AddOrEditBookForm from "./AddOrEditBookForm"
import TitleComponent from "../../SharedComponents/TitleComponent"
import LoadingComponent from "../../SharedComponents/LoadingComponent"

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "100%",
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
export const renderButtons = (book, props, showModalFunction) => props.history.location.pathname.includes('admin') ? (
  <React.Fragment>
    <Button size="small" color="primary" onClick={()=>props.history.push(`/admin/catalog/${book.bookID}`)}>
      View
    </Button>
    <Button size="small" color="primary" onClick={()=>showModalFunction(book)}>
      Edit
    </Button>
    <IconButton aria-label="add" 
      onClick={async()=> props.removeBookFromCatalog(book.bookID)}>
      <Delete />
    </IconButton>
  </React.Fragment>
):(
<React.Fragment>
    <Button size="small" color="primary" onClick={()=>props.history.push(`/client/catalog/${book.bookID}`)}>View</Button>
        <IconButton aria-label="add" onClick={async()=> props.addBookToOrder(book.bookID, book.title, book.bookCover)}>
      <ShoppingCart />
    </IconButton>
</React.Fragment>
)

function CatalogComponent(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [currentBook, setCurrentBook] = React.useState(null)
  const { currentUserData } = props.user
  const handleOpen = (book) => {
    setCurrentBook(book)
    setOpen(true)
  }
  const handleClose = () => {
    setCurrentBook(null)
    setOpen(false)
  }
  const handleOpenEditBookModal = (book) => {
    setCurrentBook(book)
    props.toggleEditBookModal(true)
  }
  const handleCloseEditBookModal = () => {
    setCurrentBook(null)
    props.toggleEditBookModal(false)
  }
  return props.catalog.fetchinCatalog ? (
    <LoadingComponent />) : (
          <div>
      <CssBaseline />
      <main>
        <TitleComponent title="Catalog">
          {(currentUserData && currentUserData.role && currentUserData.role === 'admin')
          && <Typography align="center" gutterBottom>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.toggleAddBookModal(true)}
                >
                  Add New Book
                </Button>
              </Typography>
            }
        </TitleComponent>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {props.catalog.books.map((book) => (
              <Grid item key={book.bookID} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={book.bookCover}
                    title={book.title}
                    onClick={() => handleOpen(book)}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {book.title}
                    </Typography>
                    <Typography>
                      This book was written by 
{' '}
{book.author} and was first
                      published on 
{' '}
{book.publicationDate}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {renderButtons(book, props, handleOpenEditBookModal)}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <CustomModal open={open} handleClose={handleClose}>
        <BookCard book={currentBook} />
      </CustomModal>
      <CustomModal
        open={props.catalog.addBookModalVisible}
        handleClose={() => props.toggleAddBookModal(false)}
      >
        <AddOrEditBookForm />
      </CustomModal>
      <CustomModal
        open={props.catalog.editBookModalVisible}
        handleClose={handleCloseEditBookModal}
      >
        <AddOrEditBookForm book={currentBook} />
      </CustomModal>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={props.catalog.showNotification}
autoHideDuration={4000}
onClose={()=>props.toggleShowNotification(false)}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Catalog has been updated successfully!
        </Alert>
      </Snackbar>
    </div>
  )
}
// ==================================================================================================
const mapStateToProps = (state) => ({
  catalog: state.catalog,
  user: state.user,
})

// ==================================================================================================
function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
        addBookToOrder,
        removeBookFromCatalog,
        toggleEditBookModal,
        toggleAddBookModal,
        toggleShowNotification,
    }, dispatch),
    dispatch,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CatalogComponent))
