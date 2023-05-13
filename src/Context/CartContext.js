import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext()

export default function CartContextProvider(props){

  let header = {
    token:localStorage.getItem("userToken")
  }


  // let headers ={
  //   token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzA4OGQxZGNmNmFlMDAzZDBlNGNmYSIsIm5hbWUiOiJtb2hhbWVkIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODI2MTU4OTksImV4cCI6MTY5MDM5MTg5OX0.pZgKlPqnnvLFy-yk_03M-sh5xqP0SeNnizvCGX7BfgI"
  // }

useEffect(()=>{
  getCart()
},[])

const [numOfCartItems, setNumOfCartItems] = useState(0)
const [cartId, setCartId] = useState(null)

async function getCart(){
  let response = await getUserCart()
  console.log(response);
  if(response?.data?.status === "success"){
  setNumOfCartItems(response?.data?.numOfCartItems)
  setCartId(response?.data?.data?._id)
}else{
  setNumOfCartItems(response?.data?.numOfCartItems)
}
}

async function AddUserCart( product , ratingAvarege){
  return axios.post(`https://coffee-2pwn.onrender.com/api/v1/carts`,
  {
    "title":"very good",
    product,
    ratingAvarege
  },
  {
  headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
}


async function getUserCart(){
  return axios.get(`https://coffee-2pwn.onrender.com/api/v1/carts`,
  {
  headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
}


async function updateProductCart(product,quantity){
  console.log(product);
  return axios.put(`https://coffee-2pwn.onrender.com/api/v1/carts`,
  {
    quantity,
    product
  },
  {
  headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
}



async function deleteProductCart(productId){
  console.log(productId);
  return axios.delete(`https://coffee-2pwn.onrender.com/api/v1/carts/${productId}`,
  {
    headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
}



async function userAddresses() {
  return axios.get(`https://coffee-2pwn.onrender.com/api/v1/users/myProfile`,
  {
    headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
  }

async function userAddressesUpdate(details , phone , city , street) {
  console.log(details);
  return axios.patch(`https://coffee-2pwn.onrender.com/api/v1/adresses`,
  {
    street:street,
    details: details,
    phone: phone,
    city: city
  },
  {
    headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
  }

  async function OrderRequest(shippingAddress,paymentMethodType){
    console.log(shippingAddress);
    console.log(paymentMethodType);
    return axios.post(`https://coffee-2pwn.onrender.com/api/v1/orders`,
    {
      shippingAddress,
      paymentMethodType
    },
    {
    headers:header
    })
    .then((response)=>response)
    .catch((error)=>error)
  }

  async function payByVisa(shippingAddress) {
  return axios.post(`https://coffee-2pwn.onrender.com/api/v1/orders/checkout-session`,
  {
    shippingAddress:shippingAddress
  },
  {
    headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
  }

return <cartContext.Provider value={{payByVisa , header , userAddressesUpdate,cartId, numOfCartItems ,AddUserCart , getUserCart , deleteProductCart , updateProductCart , setNumOfCartItems  , userAddresses , OrderRequest}}>  {props.children}
</cartContext.Provider>
}