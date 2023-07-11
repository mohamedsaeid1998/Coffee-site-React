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

export default function Register() {
let navigate = useNavigate()
const [ErrorMessage, setErrorMessage] = useState("")
const [Loading, setLoading] = useState(false)


async function handelRegister(values){
    setLoading(true)
let {data} = await axios.post("https://coffee-2pwn.onrender.com/api/v1/users/signup",values)
.catch((error)=>{
    setLoading(false)
    setErrorMessage(error.response.data.message)
    toast.error("Registration was not completed successfully",{ duration: 2000, position: 'bottom-center',className: 'bg-danger text-white'})

})
if (data === "success registration please verify your email address"){
    toast.success("Your registration has been successful, Check your Email",{ duration: 3000, position: 'bottom-center',className: 'bg-success text-white'})
setLoading(false)
navigate("/login")

}
}

let validation =Yup.object({
    name:Yup.string().required("Username is required").min(3,"Username minLength is 3").max(20,"userName maxLength is 20"),
    email:Yup.string().required("Email is required").email("this email is invalid"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,"password min Length is '8' It must contain at least one letter and a number"),
    phone:Yup.string().required("Phone is required").matches(/01[0125][0-9]{8}$/,"phone number must be egyptian number"),
})


let formik =useFormik({
    initialValues:{
        name:"",
        email:"",
        password:"",
        phone:"",
    },
    validationSchema:validation,
    onSubmit:handelRegister
})

return <>
                <Helmet>
        <title>Register</title>
        </Helmet>
    <section className='min-vh-100 w-100   '>
        <div className="container d-flex justify-content-center align-items-center">
        <div className="register w-75 rounded overflow-hidden">
            <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
<img className='w-100 h-100' src={image} alt="" />

                </div>

                <div className="col-lg-6">

                    <div className=" p-3">
                    <header className="text-center">
                        <img src={logo} alt="logo CAFENA" />
                        <h1 className='my-1 fw-bold text-main'>Register To CAFENA</h1>
                    </header>

                    <form  onSubmit={formik.handleSubmit} className="row gap-0 mt-3" id="register">

                    <div className="col-12 mt-1">
                        <div className="form-data">
                        <input className='w-100 form-control my-2' type="text" placeholder='Enter Your Name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' id='name' />
                        {formik.errors.name && formik.touched.name?<div className='alert alert-danger  '>{formik.errors.name}</div> :null}
                        </div>
                    </div>

                    <div className="col-12 mt-1">
                        <div className="form-data">
                        <input className='w-100 form-control my-2' type="password" placeholder='Enter Your Password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' id='password'/>
                        {formik.errors.password && formik.touched.password?<div className='alert alert-danger  '>{formik.errors.password}</div> :null}
                        </div>
                    </div>

                    <div className="col-12 mt-1">
                        <div className="form-data">
                        <input className='w-100 form-control my-2' type="email" placeholder='Enter Your Email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' id='email' />
                        {formik.errors.email && formik.touched.email?<div className='alert alert-danger'>{formik.errors.email}</div> :null}
                        {ErrorMessage?<div className='alert alert-danger'>This email has already been registered</div>:null}
                        </div>
                    </div>

                    <div className="col-12 mt-1">
                        <div className="form-data">
                        <input className='w-100 form-control my-2' type="tel" placeholder='Enter Your Phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' id='phone' />
                        {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger  '>{formik.errors.phone}</div> :null}
                        </div>
                    </div>

                    <div className="col-12 mt-2">
                        {Loading? <button type="button" className="btn w-100  btn btn-primary" id="btnRegister"><i className='fas fa-spinner fa-spin'></i></button>:
                        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn btn-primary w-100" id="btnRegister">Create Account</button>}

                <p className="text-center text-white mt-2 w-100">
                Already a member ?
                <Link to="/login" className=" btn-sub link-secondary text-decoration-none" role="button"> LogIn 
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