import './index.css'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import PaymentModal from '../PaymentModal'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const total = cartList.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.price
      }, 0)
      return (
        <div className="summary-container">
          <div className="total-container">
            <h1 className="order-total-heading">
              Order Total: <span className="total-rs">Rs: {total}</span>
            </h1>
            <p className="items-carts">{cartList.length} items in cart</p>
          </div>
          <Popup
            modal
            trigger={<button className="checkout-btn">Checkout</button>}
            position="top left"
            closeOnDocumentClick
          >
            {close => <PaymentModal close={close} />}
          </Popup>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
