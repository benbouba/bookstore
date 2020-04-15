import React from 'react'
import {Container, Tabs, Tab, Typography, AppBar, Box } from '@material-ui/core'

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//Actions
import {getOrders} from '../redux/clientActions'

//Custom Components
import OrderListComponent from '../../SharedComponents/OrdersListComponent'

/**
 * Tab panel Component for Client orders and order history
 * Ref:https://material-ui.com/components/tabs/#SimpleTabs.js
 * @param {*} props 
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
/**
 * Component for client orders
 */
class ClientOrders extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0
    }
    //Load client orders from local storage
    if(props.client.orders.length === 0){
      props.getOrders()
    }
  }
  
  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  }
    render() {
      const {value} = this.state
      const {orders} = this.props.client 
      // Filter active and old orders
      const activeOrders = Object.keys(orders).length > 0 ? Object.values(orders).filter(order=>order.orderStatus === 'open' || order.orderStatus === 'paid') : []
      const orderHistory = Object.keys(orders).length > 0 ? Object.values(orders).filter(order=>order.orderStatus === 'cancelled' || order.orderStatus == 'sent') : []
        
      return(
          <Container>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Your Orders
            </Typography>  
            {/* Tab Header */}
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange} aria-label="simple tabs example">
                <Tab label="Open Orders" {...a11yProps(0)} />
                <Tab label="Order History" {...a11yProps(1)} />
              </Tabs>
          </AppBar>
          {/* Tab Panels */}
          <TabPanel value={value} index={0}>
            <OrderListComponent orders={activeOrders} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OrderListComponent orders={orderHistory} />
          </TabPanel>
        </Container>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   client: state.client
  })
  
  // ==================================================================================================
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({
        getOrders
      }, dispatch),
      dispatch
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ClientOrders)
  