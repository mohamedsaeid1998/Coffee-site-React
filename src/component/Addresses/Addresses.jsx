
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export default function Addresses() {
  let navigate = useNavigate()

useEffect(()=>{
  getUserAddresses()

},[])




let {userAddresses ,OrderRequest ,setNumOfCartItems} = useContext(cartContext)
const [userAddress, setUserAddress] = useState(null)
async function getUserAddresses(){
  let response = await userAddresses()
  setUserAddress(response.data)
  console.log(response);
}

async function makingOrder(shippingAddress,paymentMethodType){
  console.log(shippingAddress);
  console.log(paymentMethodType);

  let response = await OrderRequest(shippingAddress,paymentMethodType)
  if(response?.data?.status === "success"){
  swal("Good job!", "The order has been successfully requested", "success");
  setNumOfCartItems(0)
  navigate("/")
  }
  console.log(response);
}


function orderDetails(details , phone , city , street) {
  
let shippingAddress = {
    details:details,
    phone:phone,
    city:city,
    street:street,
  }

  let paymentMethodType={
    paymentMethodType:"Cash"
  }


  makingOrder(shippingAddress,paymentMethodType )

}

  return <>
  {userAddress?  <div className="container-fluid container-lg pt-5 my-5 ">
    <div className='d-flex justify-content-between align-items-center'>
    <h3 className='fw-bold text-main '>Addresses :</h3>
    <Link to={"/checkOut"}><span className='text-main'>To Another Address <i className="fa-solid fa-chevron-right small text-main"></i></span></Link>
    </div>
  {userAddress.User.addresses.map((address,index)=><div key={index} className=" ">
    <div className='border-bottom cursor-pointer  p-2 '>
    </div>
    <div className='d-flex justify-content-between align-items-center bg-background p-2'>
      <div>
      <p className='text-address mt-3'>{address.details}  | {address.street} - {address.city} </p>
      <p className='text-address mt-3'> Phone : +2{address.phone}</p>
      </div>

<div>
<button onClick={()=>orderDetails(address.details , address.phone , address.city , address.street )} className='btn btn-primary fw-bold'>Confirm Order</button>

</div>
    </div>
</div>)}

</div>:<Loading/>}

  
  
  
  </>
}
