import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

export default function Brands() {

useEffect(()=>{
  getBrands()
},[])

const [Brands, setBrands] = useState(null)
async function getBrands(){
    let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/brands`).catch((error)=>error)
    setBrands(data)
    console.log(data);
  }

  async function handlePageClick(data){
    let page = data.selected+1
    console.log(page);
    setBrands(page)
  }

  return <>

    {Brands?
        <div className="container-fluid container-lg">
        <div className="row my-5 pt-5 g-4 ">
        {Brands.result.map((product)=><div key={product._id} className=' col-lg-4 col-md-6'>
  <div className="box">
            <Link to={`/brandsDetails/${product._id}`}>
      <div>
           <img className=' rounded-circle' src={product.image} height={100} width={100}  alt="" />
            <h4 className='text-main fw-bold text-center mt-2 mb-0'>{product.name.split(" ").slice(0,2).join(" ")}</h4>
    </div>
              <button  className='btn w-100 bg-main text-white mt-3'> Show Products</button>
          </Link>
          </div>

  </div>)}
  {Brands.pages!==1?  <ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={Brands.pages}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName='pagination justify-content-center'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        activeClassName='active'
      />:null}

        </div>
        </div>
        
    :null}

  
  
  
  </>
}

