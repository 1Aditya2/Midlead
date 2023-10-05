import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TOAST_FAILURE } from "../App";
export const getProducts = createAsyncThunk("poster/getProducts", async (body,thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true))//dispatching the loading bar
    const response = await axios.get(
      "http://localhost:4000/products/getProducts"//a get api call to the server /products/getProducts which will fetch all the products in the databse
    );
    
    return response.data.result;//returnig the result to builder 
  } catch (error) {
    console.log(error,'response at error');
    thunkAPI.dispatch(showToast({
        type:TOAST_FAILURE,
        message:'Sorry,cannot fetch posters'//if some error occurs in api call then data will not get fetched and this message will be displayed
    }))
  } finally {
    //dispatching the setLoading after try block gets executed 
    thunkAPI.dispatch(setLoading(false))
  }
});
export const removeFromCart = createAsyncThunk(
  "poster/remove",
  async (body, thunkAPI) => {
    try {
       
      const response = await axios.post(
        "http://localhost:4000/products/removeFromCart",//a post api call to /removeFromCart and passing id to find the specific product to be removed from cart
        {
          id: body.id,
        }
      );
     
      return response.data.result;
    } catch (error) {
        thunkAPI.dispatch(showToast({
            type:TOAST_FAILURE,
            message:'Sorry, cannot remove from cart'
        }))

    } 
  }
);
export const addToCart = createAsyncThunk(
  "poster/add",
  async (body, thunkAPI) => {
    try {
       
      const response = await axios.post(
        "http://localhost:4000/products/addToCart",//a post api call to /addToCart and passing id to find the specific product to be added to cart
        {
          id: body.id,
        }
      );
     
      return response.data.result;
    } catch (error) {
  
      thunkAPI.dispatch(showToast({
        type:TOAST_FAILURE,
        message:'Sorry, cannot add to cart'
    }))
    } 
  }
);
export const getCart = createAsyncThunk("poster/getCart", async (body,thunkAPI) => {
  try {
  
    const response = await axios.get("http://localhost:4000/products/getCart");//a get api call to /getCart fetching all the products which are in cart
    
    return response.data.result;
  } catch (error) {
   
    thunkAPI.dispatch(showToast({
        type:TOAST_FAILURE,
        message:'Sorry, cannot fetch cart'
    }))
  } 
});
export const removeCartItem = createAsyncThunk(
  "poster/removeItemFromCart",
  async (body, thunkAPI) => {
    try {
        thunkAPI.dispatch(setLoading(true))
      const response = await axios.post(
        "http://localhost:4000/products/removeCartItem",//a post api call to /removeCartItem to remove the item from cart by passing its id to help find
        {
          id: body.id,
        }
      );
      
      return response.data.result;
    } catch (error) {
    
    thunkAPI.dispatch(showToast({
        type:TOAST_FAILURE,
        message:'Sorry, cannot remove cart item'
    }))
    } finally {
        thunkAPI.dispatch(setLoading(false))
        
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    isLoading: false,
    toastData:{},
    totalItems: 0,
    Products: [],
    Cart: [],
  },
  reducers: {
    setLoading:(state,action)=>{
        state.isLoading=action.payload
    },
    showToast:(state,action)=>{
        state.toastData=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        // if api call gets fullfilled the returned response is not undefined the store variable will be updated with action.payload
        const allProd = action.payload;
        if (allProd == undefined) {
          state.Products = [];
        } else {
          state.Products = allProd;
          allProd?.map((each) => {
            state.totalItems += each.quantity;
          });
        }
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const myProd = action.payload;

        if (myProd == undefined) {
          
        } else {
          //finding the product in cart and updating the product
          let index = state.Cart?.findIndex((prod) => prod._id === myProd._id);
          if (index != -1) {
            state.Cart[index] = myProd;
          } else {
            state.Cart.push(myProd);
          }
          state.totalItems += 1;//increasing the overall quantity of cart item
          //finding the product in Products and updating the product
          index = state.Products.findIndex((prod) => prod._id === myProd._id);
          state.Products[index] = myProd;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const myProd = action.payload;
        if (myProd == undefined) {
          
        } else {
          //finding the prodcut in cart by finding its index,if index!=-1 then updating the product at that index
          let index = state.Cart?.findIndex((prod) => prod._id === myProd._id);
          if (index != -1) {
            if (myProd.quantity === 0) {
              state.Cart.splice(index, 1);//removing the cart item from cart
            } else {
              state.Cart[index].quantity = myProd.quantity;
            }
            state.totalItems -= 1;
          }
          index = state.Products?.findIndex((prod) => prod._id === myProd._id);
          state.Products[index] = myProd;
        }
      })
      .addCase(getCart.fulfilled, (state, action) => {
       //filling the cart with data returned from server
        if (action.payload == undefined) {
          state.Cart = [];
        } else {
          state.Cart = action.payload;
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const myProd = action.payload;
        if (myProd == undefined) {
        } else {
          //fidnign the product in cart through findIndex method remving it from cart decreasing the totaltitems the products quantity and updating the product in cart and Products
          let index = state.Cart?.findIndex((prod) => prod._id === myProd._id);
          state.totalItems -= state.Cart[index].quantity;
          state.Cart.splice(index, 1);
          index = state.Products?.findIndex((prod) => prod._id === myProd._id);
          state.Products[index].quantity = myProd;
        }
      });
  },
});
export default productSlice.reducer;

export const { setLoading,showToast } = productSlice.actions;
