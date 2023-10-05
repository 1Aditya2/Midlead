import React, { useState } from 'react'
import { AiFillAccountBook } from 'react-icons/ai'
import axios from 'axios'
function CreateProduct() {
    const [postImage,setPostImage]=useState('')
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    // const [quantity,setQuantity]=useState('')

    function handleImageChange(e){

        const file=e.target.files[0]
        const filereader=new FileReader()
        filereader.readAsDataURL(file)
        filereader.onload=()=>{
            if(filereader.readyState===filereader.DONE){
                setPostImage(filereader.result)
            }
        }
    }
    async function handleSubmit(){
        console.log(name);
        console.log(price);
        console.log(postImage);
        const res=await axios.post('http://localhost:4000/products/',{
            name,
            price,
            image:postImage
        })
        console.log(res,'response at frontend');
    }
  return (
    <div className='create'>
        <form action="">
            <label htmlFor="name">Name</label>
            <input type="text" id='name' onChange={(e)=>{setName(e.target.value)}}/>
            <label htmlFor="price">Price</label>
            <input type="text" id='price' onChange={(e)=>{setPrice(e.target.value)}}/>
            <label htmlFor="image">
                <AiFillAccountBook/>
            </label>
            <input
              type="file"
              className="inputImg"
              id="inputImg"
              accept="image/*"
              
              onChange={handleImageChange}
            />
            
        </form>
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default CreateProduct