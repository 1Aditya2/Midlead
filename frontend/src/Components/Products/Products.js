import React, { useEffect } from "react";
import "./Products.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProducts } from "../../Redux/productSlice";
function Products() {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state.productSliceReducer.Products//fetching all the products by refering to Products variable in store
  );
  useEffect(() => {
    dispatch(getProducts());//dsipatching the getProducts when the components renders for the first time
  }, []);
  return (
    <div className="products center">
      <div className="heading">Our Top Products,Exclusively for You!</div>
      <div className="prod-cont">
        {allProducts?.map((each) => {
          return (
            <div className="prod-item" key={each?._id}>
              <div className="prod-image">
                <div className="image">
                  <img src={each?.image?.url} alt="" />
                </div>
                <div className="overlay">
                  {each?.quantity>0?<div className="added cta">Added!</div>:<button//if the product is in cart then added message else add to cart button
                    className="addtocart cta"
                    onClick={() => {
                      dispatch(addToCart({id:each?._id}));
                    }}
                  >
                    Add to cart
                   
                  </button>}
                  
                </div>
              </div>
              <div className="prod-info">
                <div className="name">{each?.name}</div>
                <div className="price">₹{each?.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
