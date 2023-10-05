import React from 'react'
import './Cartitem.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { addToCart, removeCartItem, removeFromCart } from '../../Redux/productSlice'
function Cartitem({cart}) {
  const dispatch=useDispatch()
 //displaying all the details of each cart product passed as prop in cartItem component
  return (
    <div className="Cartitem">
      
      <div className="item-img">
        <img src={cart?.image?.url} alt="" />
      </div>
      <div className="item-info-wrapper">
        <div className="item-info">
          <p className="title">{cart?.name}</p>
          <p className="price">₹{cart?.price}</p>
          <div className="quantity-selector">
            <span
              className="btn decrement"
              onClick={() => {
                dispatch(removeFromCart({id:cart?._id}));//dsipatching action called removefromcart declared in slice
              }}
            >
              -
            </span>
            <span className="quantity">{cart?.quantity}</span>
            <span
              className="btn increment"
              onClick={() => {
                dispatch(addToCart({id:cart?._id}));//dispatching action called addtocart declared in slice 
              }}
            >
              +
            </span>
          </div>
          <p className="total-price">
            Subtotal:Rs {cart?.quantity * cart?.price}
          </p>
        </div>
        <div className="item-remove">
          <AiOutlineClose
            onClick={() => {
              dispatch(removeCartItem({id:cart?._id}));//dispacthing action called removeCartItem
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Cartitem