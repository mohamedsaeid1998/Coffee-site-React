import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Loading from '../Loading/Loading';
import Categories from '../Categories/Categories';
import { Helmet } from 'react-helmet';
import ReactPaginate from 'react-paginate';

export default function Products() {

useEffect(()=>{
  getProducts()
},[])




let {AddUserCart,setNumOfCartItems} = useContext(cartContext)

async function setToUserCart(id,rate){
  let response = await AddUserCart(id,rate)
  if(response.status === 200){
    toast.success(`The product has been added to your Cart `,{ duration: 3000, position: 'top-center',className: 'bg-success text-white text-center'})
    setNumOfCartItems(response.data.cartItems.length)
  }else{
    toast.error(`You must Sign in First `,{ duration: 3000, position: 'top-center',className: 'bg-danger text-white text-center'})
  }

}

async function handlePageClick(data){
  let page = data.selected+1

  getProducts(page)
}

const [Products, setProducts] = useState(null)
async function getProducts(page){
  let {data} = await axios.get(`https://coffee-2pwn.onrender.com/api/v1/products?page=${page}`).catch((error)=>error)
  setProducts(data)

  }

  return <>
                <Helmet>
        <title>Products</title>
        </Helmet>
  {Products ?   <div className="container-fluid container-lg">
  <div className="row my-5 g-3">
  <h2 className='display-5 text-main text-center fw-bold lh-1 mt-5 brand'>Categories</h2>
<Categories/>
    <h2 className='display-5 text-main text-center fw-bold lh-1 mt-5 brand'>Products</h2>
  {Products.result.map((product)=><div key={product.id} className=' col-lg-4 col-md-6'>
  <div className="box">
            <Link to={`/productDetails/${product.id}`}>
      <div>
            <img className=' rounded-circle' src={product.image} height={100} width={100}  alt="" />
            <h4 className='text-main fw-bold text-center mt-2 mb-0'>{product.name.split(" ").slice(0,2).join(" ")}</h4>
            <span className='fs-3 text-success'>{product.priceAfterDiscount}<sup className='fs-6 '>LE</sup><sub><del className="text-danger h6 ">{product.price!==product.priceAfterDiscount?product.price:null} </del> </sub></span>
    </div>
          </Link>
              <button onClick={()=>setToUserCart(product.id,product.ratingCount)} className='btn w-100 bg-main text-white mb-1'> ADD To Cart</button>
          </div>
  </div>)}
  </div>

<ReactPaginate
        previousLabel="< previous"
        nextLabel="next >"
        pageCount={Products.pages}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        containerClassName='pagination justify-content-center'
        pageClassName='page-item '
        pageLinkClassName='page-link '
        previousClassName='page-item'
        previousLinkClassName='page-link '
        nextClassName='page-item'
        nextLinkClassName='page-link '
        activeClassName='active'
      />
  </div>: <Loading/>}

  </>
}










