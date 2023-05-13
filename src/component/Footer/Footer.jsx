import React from 'react'
import style from './Footer.module.css'

export default function Footer() {
  return <>
  <footer className=' py-3 '>
  <div className="container ">
    
  <div className="inner-footer text-white">
    <h2>Get the Cafena app</h2>
    <p>
      we will send you a link,open it on your phone to download the app.
    </p>
    <div className="mid-footer container d-flex justify-content-between">
    <input type="email" name="" id="" placeholder='Email ..' className='form-control w-75'/>
    <button className='btn btn-success w-25 ms-3'>Share App Link</button>

    </div>
  </div>

   
<div className="payment-footer text-white row border-top border-bottom border-2 pt-3 align-items-center mt-4 container">
  <div className="col-md-6">
  <div className="right-payment">
  <ul className=' d-flex align-items-center list-unstyled'>
    <li><h5>
    Payment Partners

      </h5>
      </li>
      <li>    <i className="fa-brands fa-amazon-pay mx-3"></i>
</li>
<li>
<i className="fa-brands fa-cc-amex pay me-3"></i>

</li>
<li>
<i className="fa-brands fa-cc-mastercard pay me-3"></i>

</li>
<li>
<i className="fa-brands fa-cc-paypal pay me-3"></i>

</li>
  </ul>
  </div>
  </div>

  <div className="col-md-6">
  <div className="left-payment d-flex align-items-center">
    <h6 className=''>Get deliveries with Cafena</h6>
  
      <button className='btn btn-light me-3 d-flex align-items-center'><i className="fa-brands fa-apple fs-4"></i>Available on the App Store</button>
      <button className='btn btn-light  d-flex align-items-center'><i className="fa-brands fa-google-play fs-4"></i>Get it on Google Play</button>


  </div>
  </div>
</div>

  </div>



</footer>
  
  
  
  
  </>
}
