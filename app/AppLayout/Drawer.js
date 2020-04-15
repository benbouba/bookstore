import React from 'react';
import { withRouter } from 'react-router-dom'
import {Home, Person,  ShoppingCart, LibraryBooks, People} from '@material-ui/icons';
import {Divider, Drawer, List, Hidden, ListItem, ListItemIcon, ListItemText }from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//Actions
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
          title: 'Catalog',
          path: '/client/catalog',
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
          title: 'Catalog',
          path: '/admin/catalog',
          icon: <Home />
        },
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
      ]
}
/**
 * Drawer component for app
 * @param {*} props 
 */
function ResponsiveDrawer(props) {
  const { container, client } = props;
  const classes = useStyles();
  const theme = useTheme();

const currentDrawerLinks = drawers[props.drawerType]
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {currentDrawerLinks.map((link, index) =><ListItem 
          selected={props.history.location.pathname === link.path}
          button key={index} onClick={()=> {
            props.history.push(`${link.path}`)
          }
            }>
          <ListItemIcon>{link.icon}</ListItemIcon>
          <ListItemText primary={link.title} />
        </ListItem>)}
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
    user: state.user,
    client: state.client
  })
  
  // ==================================================================================================
  
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({toggleDrawer}, dispatch),
      dispatch
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer))
