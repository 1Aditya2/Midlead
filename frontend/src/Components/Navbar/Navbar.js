import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../Redux/productSlice";
function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const dispatch=useDispatch()
   let totalItems=useSelector((state)=>state.productSliceReducer.totalItems)
  useEffect(()=>{
    dispatch(getCart())//dispatching an action called getCart as declared in slice everytime opencart changes
  
  },[openCart])

  

  return (
    <>
      <div className="navbar center">
        <div className="nav-cont">
          <div className="title center">Posterz.</div>
          <div className="cart-icon center">
            <AiOutlineShoppingCart
              onClick={() => {
                setOpenCart(!openCart);
              }}
            />
            <span className="cart-count center">{totalItems}</span>
          </div>
        </div>
      </div>
      {openCart && (//whenevr opencart==true only then Cart component will render
        <Cart
          onClose={() => {
            setOpenCart(false);
          }}
        />
      )}
    </>
  );
}

export default Navbar;
