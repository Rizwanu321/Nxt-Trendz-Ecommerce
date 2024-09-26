import './index.css'
import CartContext from '../../context/CartContext'

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
          <button className="checkout-btn">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
