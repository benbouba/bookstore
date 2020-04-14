import React from 'react';
import {Button, IconButton, Toolbar, AppBar, Typography, Badge} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import {ShoppingCart, Menu} from '@material-ui/icons';

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import {logoutUser, toggleDrawer} from '../User/redux/userActions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  
}));
/**
 * Counter for shopping basket
 * @param {*} orders 
 * @param {all active orders or all books in actiove orders} flag 
 */
export const getBadgeCount=(orders, flag)=>{
  let count = 0
  if(Object.keys(orders).length > 0){
    Object.values(orders).forEach(order=>{
      if(order.orderStatus == 'open'){
        if(flag === 'allBooks'){
          order.books.forEach(book=>{
            count+=book.quantity
          })
        }else{
          count += 1
        }
      }
    })
  }
  return count
}
function Header(props) {
  const classes = useStyles()
  const { container, client } = props;
  return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.toggleDrawer}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            e-Bookstore
          </Typography>
          <IconButton aria-label={"show 17 new notifications"} color="inherit" 
            onClick={()=>props.history.push('/client/orders')}>
              <Badge badgeContent={getBadgeCount(client.orders, 'orders')} color="error">
              <ShoppingCart />
              </Badge>
            </IconButton>
          <Button color="inherit" onClick={async()=>{
          await props.logoutUser()
          props.history.push('/')
        }            
          }>Logout</Button>
        </Toolbar>
      </AppBar>
  )
}
// ==================================================================================================

const mapStateToProps = state => ({
  user: state.user,
  client: state.client
})

// ==================================================================================================

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({logoutUser, toggleDrawer}, dispatch),
    dispatch
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))