import React from 'react';
import {Button, IconButton, Toolbar, AppBar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {logoutUser, toggleDrawer} from '../User/redux/userActions'
import {withRouter} from 'react-router-dom'

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

function Header(props) {
  const classes = useStyles()
  console.log(props)
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            e-Bookstore
          </Typography>
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
  user: state.user
})

// ==================================================================================================

function mapDispatchToProps (dispatch) {
  return {
    ...bindActionCreators({logoutUser, toggleDrawer}, dispatch),
    dispatch
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))