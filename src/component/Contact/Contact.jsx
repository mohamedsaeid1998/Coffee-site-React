import React from 'react'
import style from './Contact.module.css'
import { Helmet } from 'react-helmet'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import formData from "form-data"
export default function Contact() {
  let navigate = useNavigate()

const onSubmit = (e) =>{
  e.preventDefault();
  const FormData = new formData(e.currentTarget)
  console.log(FormData);
  toast.success(`Your message was sent successfully`,{ duration: 3000, position: 'top-center',className: 'bg-success text-white'})
  navigate("/")
}
  return <>
    <Helmet>
      <title>Contact</title>
    </Helmet>
  <section className="contact py-5" id="contact">
<div className="container mt-5 ">
  <div className="main-title mb-3">

    <h3 className="h1 fw-bold text-main mainColor text-center"> Contact Us</h3>
  </div>
</div>
<div className="container-fluid">
  <div>
  <iframe className="map"
    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
    ></iframe>
  </div>

  <div className="container">
    <div className="row mt-5">
      <div className="col-lg-4 ">
        <div className="contact-info">
          <ul className=" list-unstyled  d-flex flex-column gap-4">
            <li className="d-flex text-white flex-wrap position-relative">
              <span>
                <i className="fa-solid fa-location-dot fa-bounce"></i>
              </span>
              <h4 className="h5 fw-semibold w-100">Location :</h4>
              <p className="text-secondary">A108 Adam Street, New York, NY 535022</p>
            </li>
            <li className="d-flex text-white flex-wrap position-relative">
              <span>
                <i className="fa-regular fa-clock fa-beat"></i>
              </span>
              <h4 className="h5 fw-semibold w-100">Open Hours :</h4>
              <p className="text-secondary">Monday-Saturday:
                11:00 AM - 2300 PM</p>
            </li>
            <li className="d-flex text-white flex-wrap position-relative">
              <span>
                <i className="fa-solid fa-envelope fa-flip"></i>
              </span>
              <h4 className="h5 fw-semibold w-100">Massage Me:</h4>
              <p className="text-secondary">msmma19998@gamil.com</p>
            </li>
            <li className="d-flex text-white flex-wrap position-relative">
              <span>
                <i className="fa-solid fa-mobile-screen-button fa-shake"></i>
              </span>
              <h4 className="h5 fw-semibold w-100">Call:</h4>
              <p className="text-secondary">+20 01000722670</p>
            </li>
          </ul>
        </div>

      </div>
      <div className="col-lg-8 text-center order-2 order-lg-1">
        <form className="text text-center " onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="input-con">
                <input className="form-control mb-4 py-2" type="text" placeholder="Your Name" required/>
              </div>
            </div>
            <div className="col-md-6">
              <input className="form-control mb-4 py-2" type="email" placeholder="Your Email" required/>
            </div>
          </div>
          <input className="form-control mb-3 py-2" type="text" placeholder="Subject" required/>
          <textarea className="form-control" name="area" rows="8" placeholder="Message"></textarea>
          <button className="fw-normal fs-6 mt-4 text-capitalize text-white btn bg-main rounded-3"  >Send Message</button>
        </form>
      </div>
    </div>
  </div>
</div>
</section>

  </>

}








