import React from 'react'
import {ExpansionPanelActions, Button, ListItemSecondaryAction, IconButton, Input, Chip, Typography, ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, List, ListItem, Avatar, ListItemAvatar, Divider, ListItemText} from '@material-ui/core'
import { ExpandMore, Delete} from '@material-ui/icons'

//Action creators
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  changeQuantity,
  removeBook,
  confirmPay,
  cancelOrder} from '../Client/redux/clientActions'

/**
 * Component for listing orders for both client and admin
 */
class OrdersListComponent extends React.Component {
  constructor(props){
    super(props)
    this.state ={
      quantity: 0,
      isInput: false,
      selectedBook: null
    }
  }
/**
 * Functin to generate quantity component
 * Editable if the user is client and the order has not been paid
 * or cancelled
 * @param {Object} book 
 * @param {Object} order 
 */
renderEditableQuantity(book, order){
  return(<span>Quantity:
      {(this.isEditable(order.orderStatus) && !this.isAdmin())? <Input
            defaultValue={book.quantity}
            margin="dense"
            onFocus={()=>{
              if(order.status === 'open'){
                this.setState({selectedBook:book.bookID})
              }
            }}
            onChange={async(event)=>{
              event.preventDefault()
              await this.props.changeQuantity(order.orderID, book.bookID, event.target.value)
            }}
            onBlur={()=>this.setState({selectedBook: null})}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
        /> : <span>{book.quantity}</span>}
          </span>
    )
}

  isActive =(orderStatus)=> orderStatus === 'paid' || orderStatus === 'open'
  isEditable = (orderStatus)=>orderStatus === 'open'
  isAdmin =()=> this.props.user.currentUserData.role && this.props.user.currentUserData.role === 'admin'
    render() {
      //Passed as props from the component parent
      const orders = this.props.orders
        return(
          <List >
              {/* Order */}
            {orders.map((order, index)=>{
              return(
                <ExpansionPanel key={index} >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography style={{flexBasis: '33.33%'}}>{order.orderID}</Typography>
                    <Chip variant="outlined" label={order.orderStatus} color={order.orderStatus === 'cancelled'? 'secondary' : 'primary'} />
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      {/* Books within the order */}

                    <List>
                    {order.books.map((book, bookIndex)=>{
                      return(
                        <React.Fragment  key={bookIndex}>
                          <ListItem key={index}>
                            <ListItemAvatar>
                              <Avatar variant="square"  src={book.bookCover || ''} />
                            </ListItemAvatar>
                            <ListItemText primary={book.title} secondary={this.renderEditableQuantity(book, order)} />
                            <ListItemSecondaryAction>
                              {this.isEditable(order.orderStatus) && <IconButton edge="end" aria-label="delete" onClick={async()=>await this.props.removeBook(order.orderID, book.bookID)}>
                                <Delete/>
                              </IconButton>}
                            </ListItemSecondaryAction>
                          </ListItem>
                          {bookIndex < order.books.length-1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                        )
                    })}
                    </List>
                  </ExpansionPanelDetails>
                  <Divider />
                  {/* Footer with CTAs */}
                  <ExpansionPanelActions>

                      {/* Client Actions */}
                  {(this.isActive(order.orderStatus) && !this.isAdmin()) ? 
                    <React.Fragment>
                      {this.isEditable(order.orderStatus) && 
                      <React.Fragment>
                        <Button variant="contained" color="primary" onClick={async()=> await this.props.cancelOrder(order.orderID)}>Cancel Order</Button>
                        <Button variant="contained" color="primary" onClick={async()=> await this.props.confirmPay(order.orderID)}>Make payment</Button>
                      </React.Fragment>}
                      {!this.isEditable(order.orderStatus) && <Typography >Waiting delivery confirmation</Typography>}
                     </React.Fragment> : 
                    <Typography >{order.orderStatus}</Typography>}
                    {/* End of Client Actions */}

                    {/* Admin Actions */}
                    {this.isAdmin() && <React.Fragement>
                      {order.orderStatus === 'paid' &&<Button variant="contained" color="primary" onClick={async()=> await this.props.cancelOrder(order.orderID)}>Cancel Order</Button>}
                      {order.orderStatus === 'open' && <Button variant="contained" color="primary" onClick={async()=> await this.props.confirmPay(order.orderID)}>Confirm Delivery</Button>}
                      </React.Fragement>}
                     {/* End of Admin Actions  */}
                  </ExpansionPanelActions>
                </ExpansionPanel>
              ) 
            })}
          </List>
        )
    }
}

// ==================================================================================================
const mapStateToProps = state => ({
   client: state.client,
   user: state.user
  })
  
  // ==================================================================================================
  function mapDispatchToProps (dispatch) {
    return {
      ...bindActionCreators({
        changeQuantity,
        removeBook,
        confirmPay,
        cancelOrder
      }, dispatch),
      dispatch
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(OrdersListComponent)
  