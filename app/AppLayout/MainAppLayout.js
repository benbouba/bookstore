import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {withRouter} from 'react-router-dom'
import Header from './Header'
import {logoutUser, toggleDrawer} from '../User/redux/userActions'
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
  user: state.user
 })
 
 // ==================================================================================================
 function mapDispatchToProps (dispatch) {
   return {
     ...bindActionCreators({
        logoutUser,
        toggleDrawer
     }, dispatch),
     dispatch
   }
 }
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainAppLayout))
