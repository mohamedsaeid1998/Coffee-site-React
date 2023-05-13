import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import {  Link, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'

export default function CategoryDetails() {

  let param = useParams()
  useEffect(()=>{
    getCategoryProducts(param.id)
  },[])
  

  let {AddUserCart,setNumOfCartItems} = useContext(cartContext)

  async function setToUserCart(id,rate){
    let response = await AddUserCart(id,rate)
    if(response.status === 200){
      toast.success(`The product has been added to your Cart `,{ duration: 3000, position: 'top-center',className: 'bg-success text-white text-center'})
      setNumOfCartItems(response.data.cartItems.length)
    }else{
      toast.error(`You must Sign in First `,{ duration: 3000, position: 'top-center',className: 'bg-danger text-white text-center'})
      
    }
    
  }

  const [CategoryProducts, setCategoryProducts] = useState(null)
  async function getCategoryProducts(id){
      let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/categories/${id}/products`).catch((error)=>error)
      setCategoryProducts(data)

    }

  return <>
    <Helmet>
      <title>CategoryDetails</title>
    </Helmet>
      {CategoryProducts? 
      <div className="container-fluid container-lg  pt-4">
        <div className="row pt-5 my-5 g-2">

        {CategoryProducts.result.map((product)=><div key={product.id} className='col-lg-2 col-md-3'>
    <div className="product px-2 pt-4 ">
  <Link to={`/productDetails/${product.id}`}>
      <img className='w-100 ' src={product.image}  height={170} alt="" />
      <h6 className='text-main font-sm fw-bold text-center text-md-start mt-2 mb-0'>{product.name.split(" ").slice(0,2).join(" ")}</h6>
      <h6 className='fw-bold mb-0'><span className='text-muted'>Kind :</span> <span className='text-capitalize text-white'>{product.slug.split("-").slice(0,1).join(" ")}</span></h6>
      <div className='d-flex align-items-center justify-content-between'>
      <span className='fs-3 text-success'>{product.priceAfterDiscount}<sup className='fs-6 '>LE</sup><sub><del className="text-danger h6 ">{product.price!==product.priceAfterDiscount?product.price:null} </del> </sub></span>
      <span>
        <i className='fas fa-star rating-color'></i>
          <span className='mx-1 text-white'>{product.ratingCount}</span>
        </span>
      </div>
      
    </Link>
        <button onClick={()=>setToUserCart(product.id,product.ratingCount)} className='btn w-100 bg-main text-white mb-1'> ADD To Cart</button>
    </div>
  </div>)}

        </div>
        </div>
    

    
    :<Loading/>}
  
  
  </>
}
