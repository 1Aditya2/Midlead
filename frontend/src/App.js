import { useEffect, useRef } from "react";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import Products from "./Components/Products/Products";
import toast,{Toaster} from 'react-hot-toast'
import LoadingBar from 'react-top-loading-bar'
import { useSelector } from "react-redux";
import Footer from "./Components/Footer/Footer";
function App() {
  const isLoading=useSelector(state=>state.productSliceReducer.isLoading)//subscribing to some variables declared in store
  const toastData=useSelector(state=>state.productSliceReducer.toastData)
  const loadRef=useRef(null)
  useEffect(()=>{
    if(isLoading){
      loadRef.current?.continuousStart()
    }
    else{
      loadRef.current?.complete()
    }
  },[isLoading])//a useeffect which executes everytime there's a change in isLoading variable  
  useEffect(()=>{
    switch (toastData.type) {
      case (TOAST_SUCCESS):
        toast.success(toastData.message)
        break;
      case (TOAST_FAILURE):
        toast.error(toastData.message)  
        break 
    }
  },[toastData])//a toast message which executes everytime toastData changes allowing you checks state of your app
  return (
    //listing all components 
    <div className="App">
      <LoadingBar height={3} color='#458eff' ref={loadRef} />
      <div><Toaster/></div>
      <Navbar/>
      <Hero/>
      <Products/>
      <Footer/>
     
    </div>
  );
}
export const TOAST_SUCCESS='toast_success'
export const TOAST_FAILURE='toast_failure'
export default App;

