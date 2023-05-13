import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { Offline } from "react-detect-offline";
export default function Layout({SetUserData ,setSetUserData}) {
let navigate =useNavigate()

function logout(){
  localStorage.removeItem("userToken")
  setSetUserData(null)
  navigate("./login")
}


  return <>
  
<Navbar SetUserData={SetUserData} logout={logout}/>
<Outlet/>
<Offline><div className='network'>You are offline <i className='fas fa-wifi-3 text-danger'></i></div></Offline>
<Footer/>
  </>
}
