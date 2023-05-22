import React, { useContext } from 'react'
// import Products from './../Products/Products';
import logo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'

export default function Navbar({SetUserData,logout}) {

let {numOfCartItems} = useContext(cartContext)

  return <>

  <nav className="navbar navbar-expand-lg navbar-light fixed-top ">
      <div className="container-fluid container-lg">
      <Link className="navbar-brand " to={"./"}>
      <img src={logo} height={60} alt="" />
      </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <i className="fa-solid fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="./">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="products">Products</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="brands">Brands</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="machine">Machine</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="contact">Contact</Link>
          </li>
        </ul>


        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center">

{SetUserData?<>

<li className="nav-item">
<Link to={"/reservation"}>
<i className="fa-solid fa-utensils text-white fs-4 mx-2"></i>
</Link>
</li>

<li className="nav-item">
<Link to={"/profile"}>
  <i className="fa-solid fa-user-tie fs-4 ms-3 text-white"></i>
</Link>
</li>

  <li className="nav-item position-relative">
  <Link className="nav-link" to="cart">
    <i className="fa-solid fa-cart-shopping fs-4 ms-2"></i>
    <span className='badge position-absolute top-0 end-0 text-white bg-green '>{numOfCartItems}</span>
    </Link>
</li>



<li className="nav-item">
  <span onClick={(()=>logout())} className="nav-link btn btn-danger ms-2">Logout</span>
</li>

</> :<>

          <li className="nav-item">
            <Link className="nav-link" to="login"><button className='btn btn-primary'>Login</button></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="register"><button className='btn btn-warning'>Register</button></Link>
          </li>
</>}

        </ul>

      </div>
    </div>
  </nav>
  

  
  
  </>
}
