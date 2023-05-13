import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick"
export default function Categories() {

  useEffect(()=>{
    getCategories()
  },[])

  const [Category, setCategory] = useState(null)

async function getCategories (){
  let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/categories/`).catch((error)=>error)
  setCategory(data)

}

var settings = {
  dots: true,
  infinite: true,
  speed: 100,
  slidesToShow: 5,
  slidesToScroll: 1
};

  return <>
{Category? 
  <div className="container-fluid container-lg d-flex justify-content-center">
        <div className="row  mt-5 w-100  ">
          <Slider {...settings}>
        {Category.result.map((category,index)=><div className="col-8 d-flex justify-content-center " key={index}>
          <Link to={`/categoryDetails/${category._id}`}>
                    <img src={category.image} alt="" className='text-center rounded-pill' width={120} height={120}/>
                    <p className='text-center my-3 fw-bolder small  text-main d-none d-md-block'>{category.name.split(" ").slice(0,2).join(" ")}</p>
            </Link>
        </div>
        
        
      )}
    </Slider>
        </div>
        </div>
:null}
  

  </>
}