import React from "react";
import style from "./About.module.css";
import about from "../../assets/images/coffee/111.jpg";
import {Helmet} from "react-helmet";
import Loading from "../Loading/Loading";
// import about from "../../images/Picture2.png";

export default function About() {
  return <>
  <Helmet>
<title>About Cafena</title>
</Helmet>
  {about?<section className="about py-5 " id="about">
  <div className="container mt-5 pt-5">
    <div className="row ">

    <div className="col-md-6">
        <div className="about-img position-relative">
          <img className="w-100" src={about} alt=""/>
        </div>
      </div>

      <div className="col-md-6 ">
        <div className="about-content text-white">
        <h3 className="text-main fw-bold h2 mt-2 mt-md-0 ">what makes our coffee special ?</h3>
        <p className="h5 lh-base">
          Both tea and coffee are regarded as popular beverages in the
          world. In different  parts of the world, people use to enjoy tea
          and coffee in different ways. Some people love tea without sugar
          and milk, while some people love tea with milk. Many people prefer
          cold coffee, while many others prefer hot coffee. So detailed
          discussion on coffee caffeine vs tea is enjoyable....
        </p>
        <p className="h5 lh-base">
          Both tea and coffee are regarded as popular beverages in the
          world. In different  parts of the world, people use to enjoy tea
          and coffee in different ways. Some people love tea without sugar
          and milk, while some people love tea with milk. Many people prefer
          cold coffee, while many others prefer hot coffee. So, a detailed
          discussion on coffee caffeine vs tea is enjoyable....
        </p>
        </div>
      </div>

    </div>
  </div>
</section> :<Loading/> }

  
  
  </>
}








