
import React, { useContext } from 'react'
import { useFormik } from 'formik'
import image1 from "../../assets/images/visa-color-v2.e715f0a5ea209d84b672.png"
import image2 from "../../assets/images/mastercard-color.9d92205ccccd5a3be0a144924c0e1969.svg"
import image3 from "../../assets/images/amex-color.1f90f878d6547d653ea573e04ab0ea65.svg"
import { cartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

export default function CheckOut() {



let navigate = useNavigate()

let {OrderRequest , setNumOfCartItems ,userAddressesUpdate,payByVisa} = useContext(cartContext)



  async function handleOrder(values){

    console.log(values);
    let response = await OrderRequest(values )
    let details=values.details
    let phone=values.phone
    let street=values.street
    let city=values.city
    if(response?.data?.status === "success"){
      orderDetails(details , phone , city , street)
      swal("Good job!", "The order has been successfully requested", "success");
      setNumOfCartItems(0)
      navigate("/")
      }
    console.log(response);
  }


  let formik = useFormik({
    initialValues:{
      street:"",
      details:"",
      phone:"",
      city:"",
    },
    onSubmit:handleOrder,
  })






async function getUserAddresses(details , phone , city , street){
  console.log(details);
  let response = await userAddressesUpdate(details , phone , city , street)
  console.log(response);
}

async function orderByVisa(shippingAddress){
  let response = await payByVisa(shippingAddress)
  console.log(response);
  if(response.data.status === "success"){
    console.log(response.data.url)
window.location.href=response.data.url
  }
}

function orderDetails(details , phone , city , street) {
  let detailss = details
  let  phonee=phone
  let  cityy=city
  let  streett=street
  console.log(detailss);
getUserAddresses(detailss,phonee,cityy,streett)   
  }



  return <>
                  <Helmet>
        <title>CheckOut</title>
        </Helmet>
  <div className="container-fluid container-lg py-5">
  <div className='w-75 py-5 mx-auto text-white'>
    <form onSubmit={formik.handleSubmit}>

      <label className='my-2 fw-bold' htmlFor="city">City / Area</label>
      <input type="text" className='form-control' value={formik.values.city} onChange={formik.handleChange} id='city' name='city' placeholder='E.g. Dokki / New cairo' required/>
 
      <label className='my-2 fw-bold' htmlFor="details">Address details</label>
      <input type="text" className='form-control' value={formik.values.details} onChange={formik.handleChange} id='details' name='details' placeholder='Building name' required/>

      <label className='my-2 fw-bold' htmlFor="street">Street </label>
      <input type="text" className='form-control' value={formik.values.street} onChange={formik.handleChange} id='street' name='street' placeholder='Street name ' required/>

      <label className='my-2 fw-bold' htmlFor="phone">Phone Number</label>
      <input type="tel" className='form-control' value={formik.values.phone} onChange={formik.handleChange} id='phone' name='phone' placeholder='E.g. 1xxxxxxxxxx' required/>

      <button onSubmit={()=>handleOrder()} type='submit' className='btn btn-primary my-2'>Cash On Delivery</button>
      <checkbox></checkbox>
      <div className='d-flex justify-content-between align-items-between my-2'>
        <button type='button' onClick={()=>orderByVisa(formik.values)} className='btn btn-primary'>Pay with card</button>
        <div className="images"> 
        <img src={image1} height={20} alt="" />
        <img className='mx-2' src={image2} height={20} alt="" />
        <img src={image3} height={20} alt="" />
        </div>

      </div>
    </form>
  </div>

  </div>

  </>
}
