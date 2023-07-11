import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';




export default function Home() {

  

return <>
    <Helmet>
      <title>Home page</title>
    </Helmet>
    <section className='vh-100 w-100 imgSection d-flex justify-content-center align-items-center text-main'>
      <div className="container-fluid ">
        <div className='p-5'>
          <h1 className='fw-bold text-start'>FRESH COFFEE IN THE MORNING</h1>
          <p className="w-75 homeText text-muted">If you are a coffee lover and looking to taste a different coffee,
            <br />
            try Caffè Americano. Get our FREE coffee cheat sheet and get
            <br />
            your coffee brew perfect every time.....</p>
          <Link to={"./products"} className=" btn bg-main fw-bold text-black ">Get Yours Now</Link>
        </div>
      </div>
    </section>
    
</>
}


