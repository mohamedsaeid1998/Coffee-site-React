import React from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import formData from "form-data"
export default function Reservation() {
  let navigate = useNavigate()

const onSubmit = (e) =>{
  e.preventDefault();
  const FormData = new formData(e.currentTarget)
  console.log(FormData);
  toast.success(`Reservation successful`,{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
  navigate("/")
}






  return <>

    <div className="container my-5 pt-5">
      <div className="main-title text-center">
        <h3 className="h1 text-main fw-bold"> RESERVATION FORM</h3>
      </div>
      <form id='form' className='mt-4' onSubmit={onSubmit}>
        <div className="row g-4 w-75 mx-auto">
          <div className="col-lg-6">
            <div className="input-con">
              <input className="form-control res mb-3" type="text" placeholder="Your Name" required/>
              <input className="form-control res my-4" type="date" placeholder="Date" required/>
              <input className="form-control res " type="email" placeholder="Your Email" required />

            </div>
          </div>

  
          <div className="col-lg-6">
            <div className="input-con">
            <input className="form-control res mb-3" type="time" placeholder="Time" />
              <input className="form-control res my-4" type="number" placeholder="Your Phone" required/>
              <input className="form-control res " type="number" placeholder=" seates*" required/>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="areaCon text-center">
              <button   className="fw-semibold mt-2 t btn bg-main text-white text-center mx-auto ">SUBMIT YOUR REQUEST</button>
            </div>
          </div>
        </div>
      </form>
    </div>


  </>
}
