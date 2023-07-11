import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import EmptyCart from '../EmptyCart/EmptyCart'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'


export default function Cart() {
  let navigate = useNavigate()
  let {getUserCart,deleteProductCart ,updateProductCart ,setNumOfCartItems , userAddresses } = useContext(cartContext)
  const [Product, setProduct] = useState(null)

const [load, setLoad] = useState(false)

  useEffect(()=>{
    displayCartProducts()
  },[])


async function displayCartProducts(){
  setLoad(true)
let response = await getUserCart()

  if(response?.data?.status==="success"){
    
  setLoad(false)
    setProduct(response?.data)
    setNumOfCartItems(response?.data?.numOfCartItems)
  }else{
    
    navigate("/emptyCart")
    setLoad(false)
  }
}


async function checkUserAddresses(){
let response = await userAddresses()
if(response.data.User.addresses.length===0){
  navigate("/checkOut")
}else{
  navigate("/Addresses")
}


}


async function deleteCartProducts(id){
  let response = await deleteProductCart(id)
  displayCartProducts()
}


async function updateCartProducts(id,count){
  if (count === 0){
    return ;
  }
  
  let response = await updateProductCart(id,count)
  displayCartProducts()
}

return <>
{Product ?<div className="container-fluid container-lg pt-5 my-5">


    {Product?.numOfCartItems === 0 ? <EmptyCart/> :    <div className='bg-background p-4 my-4 position-relative '>


      <div><h6 className='text-subMain h2 fw-bold'>Shop Cart</h6>
      <h6 className='text-blue fw-bolder'>Total price : {Product?.data?.totalCartPrice} EGP</h6>
        </div>

      {load? <div className='text-center'><i className='fas fa-spinner fa-spin fa-4x text-main' ></i></div>:<div>{Product?.data?.cartItems.map((product , index)=><div key={index}
        className="row py-2 my-2 border-bottom align-content-center  text-white">
        <div className="col-md-8 d-flex justify-content-start">

          <div>
          <img src={product?.product?.image}  height={180} width={180} alt="" />
          </div>

          <div className='mx-3'>
            <h6 className='fw-bold text-main h4'>{product?.product?.name}</h6>
            <h6 className='text-blue my-3 h5'><span className='fw-bold'>price :</span>  {product?.price} EGP</h6>

            <div className='my-2'>
            <button onClick={()=>updateCartProducts( product?.product?._id, product?.quantity+1)} className='btn btn-outline-light
              '>+</button>
            <span className=' mx-2 text-gold'>{product?.quantity}</span>
            <button onClick={()=>updateCartProducts(product?.product?._id, product?.quantity-1)} className='btn btn-outline-light'>-</button>
          </div>

            <div className='d-flex align-items-center'>
              <span className='me-3 text-gold'><i className='fas fa-star rating-color'></i> {product?.product?.ratingCount}</span>
              <span onClick={()=>deleteCartProducts(product?._id)} className=' p-0 m-0 text-danger cursor-pointer'><i className=' text-danger font-sm text-sm fa-regular fa-trash-can me-2 cursor-po'></i>
                Remove</span>
            </div>

          </div>
        </div>


      </div>)}</div>}
      {load? null:<div className='sticky '>
      <div className="inner-price ">
      <h5 className='fw-bolder text-white'>Order summary</h5>
      <h6 className='my-4 text-white'>Subtotal (<span className='text-primary fw-bold'>{Product?.numOfCartItems} items</span>) </h6>
      <h6 className='fw-bolder my-3 text-white'> Total <span className='price text-muted'>(Inclusive of VAT)</span>  : <span className='text-blue'>{Product?.data?.totalCartPrice} EGP</span></h6>

      <button onClick={()=>checkUserAddresses()} className='btn btn-primary ms-5'>CHECK OUT</button>

    </div> 
      </div>}

    </div> }

  </div> :<Loading/>}
  <Helmet>
    <title>Cart page</title>
  </Helmet> 
</>
}





