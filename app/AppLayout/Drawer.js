import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {Home, Person, ShoppingCart, LibraryBooks, People} from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {toggleDrawer} from '../User/redux/userActions'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
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
  }
}))
const drawers = {
    client:[
        {
          title: 'Home',
          path: '/client/home',
          icon: <Home />
        },
        {
            title: 'Profile',
            path: '/client/profile',
            icon: <Person />
        },
        {
          title:  'Orders',
          path: '/client/orders',
          icon: <ShoppingCart />,
        },
      ],
      admin:[
        {
          title:'User',
          path: '/admin/users',
          icon: <People />
        },
        {
          title: 'Orders',
          path: '/admin/orders',
          icon: <LibraryBooks />
        },
        {
          title: 'Catalog',
          path: '/admin/home',
          icon: <LibraryBooks />
        }
      ]
}

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
console.log(props.history)
const currentDrawerLinks = drawers[props.drawerType]
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {currentDrawerLinks.map((link, index) => (
          <ListItem 
            selected={props.history.location.pathname === link.path}
            button key={index} onClick={()=> {
              props.history.push(`${link.path}`)
            }
              }>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.title} />
          </ListItem>
          
        ))}
      </List>
      
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
    <Hidden smUp implementation="css">
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={props.user.drawerOpen}
        onClose={props.toggleDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawer}
      </Drawer>
    </Hidden>
    <Hidden xsDown implementation="css">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
    </Hidden>
  </nav>
  );
}
// ==================================================================================================

const mapStateToProps = state => ({
    user: state.user
  })
  
  // ==================================================================================================
  
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({toggleDrawer}, dispatch),
      dispatch
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer))
