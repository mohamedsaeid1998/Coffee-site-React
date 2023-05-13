import React, { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';


export default function Machine() {

    useEffect(()=>{
        getMachinesCards()
    },[])


    const [Cards, setCards] = useState(null)

async function getMachinesCards(){
    let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/machines`).catch((error)=>error)
    setCards(data)
    console.log(data);


}



    return <>
        <Helmet>
        <title>Machines</title>
        </Helmet>
    {Cards?  <div className="container-fluid container-lg">
<div className="row my-5 pt-3 g-3">
        <h1 className='text-center  text-main mb-1'>Coffee Machines</h1>
    {Cards.result.map((card)=><div key={card._id} className='col-md-3'>
        <Link to={`/machineDetails/${card._id}`}>
        <div className="card overflow-hidden">
            <div className="card-body p-3 img ">
                <div className=''>
                    <img src={card.image} className='w-100 ' height={230} alt="" />
                    <div className="word p-3 position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center cursor-pointer ">
                        <h3 className="text-main text-center">{card.name}</h3>
                    </div>
                </div>
            </div>
        </div>
        
    </Link>
    </div> )}

</div>
</div> : <Loading/>}


    </>
}
