import React from 'react';
import {CssBaseline,} from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

//Action creaotrs
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


//Actions
import {logoutUser, toggleDrawer, getCurrentLoggedInUser} from '../User/redux/userActions'
import {getOrders } from '../Client/redux/clientActions'
import {getAllBooks} from '../Catalog/redux/catalogActions'

//Custom components
import Header from './Header'
import Drawer from './Drawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MainAppLayout(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
     <Drawer handleToggleDrawer={()=>props.toggleDrawer()} drawerType={props.drawerType}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

// ==================================================================================================
const mapStateToProps = state => ({
  user: state.user,
  catalog: state.catalog
 })
 
 // ==================================================================================================
 function mapDispatchToProps (dispatch) {
   
   return {
     ...bindActionCreators({
        logoutUser,
        toggleDrawer,
        getAllBooks,
        getOrders,
        getCurrentLoggedInUser
     }, dispatch),
     dispatch
   }
 }
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainAppLayout))
