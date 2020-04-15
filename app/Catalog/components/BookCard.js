import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core'
import { ShoppingCart } from "@material-ui/icons"

// Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { addBookToOrder } from "../../Client/redux/clientActions"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 300,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}))
/**
 * Card component for displaying book data
 * @param {*} props
 */
function BookCard(props) {
  const classes = useStyles()
  const { book } = props
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {book.author}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="add">
            <ShoppingCart
              onClick={async () => await props.addBookToOrder(
                  boo.bookID,
                  book.title,
                  book.bookCover,
                )}
              className={classes.playIcon}
            />
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={book.bookCover}
        title={book.title}
      />
    </Card>
  )
}
// ==================================================================================================

const mapStateToProps = (state) => ({
  user: state.user,
  client: state.client,
})

// ==================================================================================================

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ addBookToOrder }, dispatch),
    dispatch,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookCard)
