import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../../images/about-img.jpeg"
import logo from "../../assets/images/logo.png"
import { useFormik } from 'formik';
import * as Yup from "yup"
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { Helmet } from 'react-helmet';

export default function Login({saveUserData}) {
let navigate = useNavigate()
const [ErrorMessage, setErrorMessage] = useState("")
const [Loading, setLoading] = useState(false)



async function handelLogin(values){
    setLoading(true)
let {data} = await axios.post("https://coffee-2pwn.onrender.com/api/v1/users/signin",values)
.catch((error)=>{
    setLoading(false)
    setErrorMessage(error.response.data.messsgae)
    toast.error(`${error.response.data.messsgae  }`,{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})
  })
if (data.token || data.messsgae==="Invalid token specified"){
  localStorage.setItem("userToken",data.token)
  saveUserData()
  toast.success(`successfully Login Welcome Back `,{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
  navigate("/")

}

}


let validation =Yup.object({
    email:Yup.string().required("Email is required").email("this email is invalid"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,"password start with a capital char and write between 5 to 10 numbers or char"),
})





let formik =useFormik({
    initialValues:{
        email:"",
        password:"",
    },
    validationSchema:validation,
    onSubmit:handelLogin
})


return <>
    <Helmet>
        <title>Login page</title>
    </Helmet>
    <section className='min-vh-100 w-100 '>
        <div className="container d-flex justify-content-center align-items-center">
        <div className="login w-75 rounded overflow-hidden">
            <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
<img className='w-100 h-100' src={image} alt="" />

                </div>

                <div className="col-lg-6">

                    <div className=" p-3">
                    <header className="text-center">
                        <img src={logo} alt="logo CAFENA" />
                        <h1 className='my-1 fw-bold text-main'>Login To CAFENA</h1>
                    </header>

                    <form  onSubmit={formik.handleSubmit} className="row gap-0 mt-3" id="Login">

                    <div className="col-12 mt-1">
                        <div className="form-data">
                        <input className='w-100 form-control my-2' type="email" placeholder='Enter Your Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id='email' />
                        {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div> :null}
                        {ErrorMessage?<div className='alert alert-danger'>{ErrorMessage}</div>:null}
                        </div>
                    </div>

                    <div className="col-12 mt-1">
                        <div className="form-data">
                        <input className='w-100 form-control my-2' type="password" placeholder='Enter Your Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id='password'/>
                        {formik.errors.password && formik.touched.password?<div className='alert alert-danger '>{formik.errors.password}</div> :null}
                        </div>
                    </div>

                    <div className="col-12 mt-2">
                        {Loading? <button type="button" className="btn w-100  btn btn-primary" id="btnLogin"><i className='fas fa-spinner fa-spin'></i></button>: <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="  btn btn-primary w-100" id="btnLogin">Sign in</button>}

                <p className="text-center text-white mt-2 w-100">
                New to CAFENA ?
                <Link to="/register" className=" btn-sub link-secondary text-decoration-none" role="button"> Join now 
                <i className="fa-solid fa-angle-right"></i></Link>
                </p>
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>




</>
}