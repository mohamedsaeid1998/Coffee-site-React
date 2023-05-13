import React from 'react'
import { Helmet } from 'react-helmet'

export default function EmptyCart() {

  return <>
                  <Helmet>
        <title>EmptyCart</title>
        </Helmet>
        <div className="container my-5 pt-5">
        <p className='text-center fs-4 fw-bolder text-white'>Looks Like your cart is empty! go ahead and explore top categories</p>
  <div className=' d-flex justify-content-center px-3 '>
   <img src={require("../../assets/images/preview.png")} alt="empty cart" className='w-75 '  />
   </div>
        </div>

 </>

}
