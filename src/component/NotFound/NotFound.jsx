import React from 'react'
import image from "../../assets/images/error.svg"
import { Helmet } from 'react-helmet'

export default function NotFound() {
  return <>
            <Helmet>
        <title>NotFound page</title>
        </Helmet>
  <div className='text-center my-5 pt-5'>
  <img src={image} className='text-center' height={700} alt="" />

  </div>
  </>
}
