import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-hot-toast'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'


export default function ProductDetails() {
let param = useParams()

  useEffect(()=>{
    getProductDetails(param.id)
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



  const [Product, setProduct] = useState(null)

  async function getProductDetails(id){
    let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/products/${id}`).catch((error)=>error)
    setProduct(data.data)

  }


  return <>
              <Helmet>
        <title>ProductDetails</title>
        </Helmet>
  {Product?<div className="container-fluid container-lg w-100">

  <div className="row align-items-center pt-5 my-5">

    <div className="col-md-4">
<img className='w-100' height={400} src={Product.image} alt="" />
    </div>

    <div className="col-md-8">
    <div className='info'>
    <h3 className='h3 fw-bolder pb-2 text-center text-main text-lg-start mt-2 mt-lg-0'>{Product.name}</h3>
    <p className='text-muted h3 p-2'>{Product.description}</p>
    <h4 className='h5 text-main'>Brand : <span className='text-warning'>{Product.brand.name}</span>  </h4>
    <h4 className='h5 text-main'>Country of Origin : <span className='text-info'>{Product.countryOfOrigin}</span>  </h4>
<div className='d-flex justify-content-between align-items-center'>
<span className='fs-3 text-success'><span className='text-main'>Price :</span> {Product.priceAfterDiscount}<sup className='fs-6 '>LE</sup></span>

  <span className='text-main'>Rate :
    <i className='fas fa-star rating-color ms-1'></i>
    <span className='fw-bold text-white'> {Product.ratingsAverage} 4.5</span>
  </span>
</div>
  <button onClick={()=>setToUserCart(Product.id,Product.ratingCount)} className='btn w-100 bg-main text-white'> ADD To Cart </button>
</div>
    </div>
  </div>

    </div>:<Loading/>}


  </>
}
