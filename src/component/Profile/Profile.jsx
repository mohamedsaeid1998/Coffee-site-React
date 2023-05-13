import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { cartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Profile() {

let {header}=useContext(cartContext)
  useEffect(()=>{
    getUserDetails()
  },[])

  const [User, setUser] = useState(null)
async function getUserDetails(){
  let response = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/users/myProfile`,
  {
    headers:header
  })
  .then((response)=>response)
  .catch((error)=>error)
  console.log(response.data.User);

  if (response.status===200){
    setUser(response.data.User)
  }
}

return <>
  {User?<div className="container mt-5 pt-5">
    <div className="main-body mt-5">

      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle"
                  width="150"/>
                <div className="mt-3">
                  <h4>{User.name}</h4>
                  <p className="text-secondary mb-1 text-capitalize">{User.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                {User.name}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Email</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                {User.email}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                {User.phone}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Mobile</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                {User.phone}
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3 mx-auto text-center">
                  <Link to={"/changePassword"}>
                  <button className="btn btn-primary ">Change Password</button>
                  </Link>

                </div>

              </div>
            </div>
          </div>
            </div>
          </div>
          </div>
          </div>:<Loading/>}

</>
}

