import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { cartContext } from './../../Context/CartContext';

export default function ChangePassword() {
let navigate = useNavigate()
    let {header}= useContext(cartContext)

  const [ErrorMessage, setErrorMessage] = useState("")
  const [Loading, setLoading] = useState(false)
  let validation =Yup.object({
    oldPassword:Yup.string().required("Old Password is required"),
    newPassword:Yup.string().required("New Password is required").matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,"password min Length is '8' It must contain at least one letter and a number")
})
  
async function changePassword(values){

  let response= await axios.patch("https://coffee-2pwn.onrender.com/api/v1/users/changePassword",values,
  {
    headers:header
  })
  .then((response)=>response)
  .catch((error)=>{

      setErrorMessage(error.response.data.messsgae)
      toast.error(`${ErrorMessage}`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})

  })
  if(response.data.message===" change password is succes"){

    toast.success(`The password has been changed successfully`,{ duration: 3000, position: 'top-center',className: 'bg-success text-white text-center'})
    navigate('/profile')
  }
}


  let formik =useFormik({
    initialValues:{
      oldPassword:"",
      newPassword:"",
    },
    validationSchema:validation,
    onSubmit:changePassword
})


  
  return <>
        <Helmet>
        <title>Change Password</title>
        </Helmet>
        <div className="container-fluid container-lg py-5">
  <div className='w-50 py-5 mx-auto text-white'>
    <form onSubmit={formik.handleSubmit}>

      <label className='my-2 fw-bold' htmlFor="oldPassword">Old Password</label>
      <input type="password" className='form-control' onBlur={formik.handleBlur} value={formik.values.oldPassword} onChange={formik.handleChange} id='oldPassword' name='oldPassword' placeholder='Type your Old Password' required/>
      {formik.errors.oldPassword && formik.touched.oldPassword?<div className='alert alert-danger mt-1  '>{formik.errors.oldPassword}</div> :null}

      <label className='my-2 fw-bold' htmlFor="newPassword">New Password</label>
      <input type="password" className='form-control' onBlur={formik.handleBlur} value={formik.values.newPassword} onChange={formik.handleChange} id='newPassword' name='newPassword' placeholder='Type your New Password' required/>
      {formik.errors.newPassword && formik.touched.newPassword?<div className='alert alert-danger mt-1 '>{formik.errors.newPassword}</div> :null}
<div className='text-center' >
<button type='submit' className='btn btn-primary mt-3 '>SUBMIT</button>
</div>

    </form>
  </div>

  </div>
  </>
}
