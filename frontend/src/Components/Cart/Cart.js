import React from 'react'
import './Cart.scss'
import { AiOutlineClose } from 'react-icons/ai';
import Cartitem from '../Cartitem/Cartitem';
import { BsCartX } from "react-icons/bs";
import { useSelector } from 'react-redux';
function Cart({onClose}) {
  const cart=useSelector(state=>state.productSliceReducer.Cart)
  let totalQuant = 0;
  cart?.forEach((item) => {
    totalQuant += item.quantity * item.price;//calculaing the total price by multiplying quantity and price
  });
  const isCartEmpty = cart.length === 0;
  return (
    <div className="Cart">
      <div
        className="overlay"
        onClick={() => {
          onClose();
        }}
      ></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div
            className="close-btn"
            onClick={() => {
              onClose();
            }}
          >
            <AiOutlineClose />
          </div>
        </div>
        <div className="cart-item">
        {cart?.map((item) => (
            <Cartitem cart={item} key={item?._id} />//for each cart product cartitem will be render
          ))}
        </div>
        {isCartEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h4>Cart is Empty</h4>
          </div>
        )}
        {!isCartEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total</h3>
              <h3 className="total-amount">Rs {totalQuant}</h3>
            </div>
            <div className="checkout">
              Checkout Now
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart