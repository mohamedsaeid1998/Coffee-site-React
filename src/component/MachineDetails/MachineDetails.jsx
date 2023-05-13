import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function MachineDetails() {

  let {id} = useParams()

  useEffect(()=>{
    getMachinesCards(id)
},[])


const [CardsDetails, setCardsDetails] = useState(null)

async function getMachinesCards(id){
let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/machines/${id}`).catch((error)=>error)
setCardsDetails(data.data)
console.log(data.data);


}


  return <>
          <Helmet>
        <title>MachineDetails</title>
        </Helmet>
    {CardsDetails?<div className="container-fluid container-lg w-100">

<div className="row align-items-center pt-5 my-5">

  <div className="col-md-4">
<img className='w-100' height={400} src={CardsDetails.image} alt="" />
  </div>

  <div className="col-md-8">
  <div className='info'>
    <div className='d-flex justify-content-start align-items-center'>
  <h3 className='h3 fw-bolder  mb-0 text-center text-main text-lg-start mt-2 mt-lg-0'>{CardsDetails.name} : </h3>
  <span className='fs-4 text-info fw-bold mt-2 text-capitalize mx-2 brand'>{CardsDetails.type}</span>
    </div>
  <p className='text-white-50 h3 p-2'>{CardsDetails.description}</p>
  <h4 className=' mb-3'><span className='text-main'>Price :</span> <span className='text-gold'>7000 EGP</span></h4>
  <h4 className='h5 text-main'>Pros : <span className='text-success '>{CardsDetails.pros}</span>  </h4>
  <h4 className='h5 mt-3 text-main'>Cons : <span className='text-danger'>{CardsDetails.cons}</span>  </h4>
  <button  className='btn w-100 bg-main text-white'> ADD To Cart </button>
</div>
  </div>
</div>

  </div>:<Loading/>}
  
  
  
  
  
  </>
}