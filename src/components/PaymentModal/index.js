import {useState, useContext} from 'react'
import './index.css'
import {
  FaCreditCard,
  FaUniversity,
  FaMobileAlt,
  FaWallet,
  FaTruck,
} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

const PaymentModal = ({close}) => {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  const {cartList} = useContext(CartContext)

  const totalPrice = () =>
    cartList.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.price,
      0,
    )

  const handlePaymentChange = event => {
    setPaymentMethod(event.target.value)
  }

  const handleConfirmOrder = () => {
    setIsConfirmed(true)
  }

  const formattedAmount = totalPrice().toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <div className="payment-bg-container">
      {isConfirmed ? (
        <div className="success-content">
          <p className="success-message">
            Your order has been placed successfully.
          </p>
          <button className="close-btn" onClick={close}>
            Close
          </button>
        </div>
      ) : (
        <>
          <div className="top-bg-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              className="payment-logo"
              alt="payment-logo"
            />
            <p className="pay-head">Nxt-Pay</p>
          </div>
          <div className="amount-bg-container">
            <div className="amount-container">
              <di>
                <p className="amt">Amount</p>
                <h1 className="rs-txt">{formattedAmount}</h1>
              </di>
              <p className="item">Items: {cartList.length}</p>
            </div>
          </div>
          <div className="select-head">
            <h1 className="s-head">Select Payment Options</h1>
          </div>
          <div className="payment-methods">
            <label className="payment-label disabled">
              <FaCreditCard className="payment-icon" />
              Card (Unavailable)
              <input type="radio" value="card" disabled />
            </label>

            <hr className="hr-line" />

            <label className="payment-label disabled">
              <FaUniversity className="payment-icon" />
              Net Banking (Unavailable)
              <input type="radio" value="net_banking" disabled />
            </label>

            <hr className="hr-line" />

            <label className="payment-label disabled">
              <FaMobileAlt className="payment-icon" />
              UPI (Unavailable)
              <input type="radio" value="upi" disabled />
            </label>

            <hr className="hr-line" />

            <label className="payment-label disabled">
              <FaWallet className="payment-icon" />
              Wallet (Unavailable)
              <input type="radio" value="wallet" disabled />
            </label>

            <hr className="hr-line" />

            <label
              className={`${
                paymentMethod === 'cod' ? 'bg-icon' : ''
              } payment-label`}
            >
              <FaTruck
                className="payment-icon"
                color={`${paymentMethod === 'cod' ? '#ffffff' : '#000000'}`}
              />
              Cash on Delivery
              <input type="radio" value="cod" onChange={handlePaymentChange} />
            </label>
          </div>
          <div className="btn-container">
            <button
              type="button"
              className="confirm-order-button"
              onClick={handleConfirmOrder}
              disabled={paymentMethod !== 'cod'}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PaymentModal
