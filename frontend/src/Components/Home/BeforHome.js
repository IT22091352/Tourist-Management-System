import React from "react";
import BeforNav from "../NavBar/BeforNav";
import "./beforhome.css"; 

function BeforHome() {
  return (
    <div className="beforhome">
      <BeforNav />
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Travel Go</h1>
          <p className="topic_1">Because the greatest part of a road trip isn’t arriving at your destination. <br></br>
          It’s all the wild stuff that happens along the way” - Emma Chase</p>
        </div>
      </div>
      
 
      
      {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonial-item">
          <p>"This is an amazing platform!"</p>
          <h4>- Alice</h4>
        </div>
        <div className="testimonial-item">
          <p>"I love using  Travel Go!"</p>
          <h4>- Jack</h4>
        </div>
      </div>
      

      
    </div>
  );
}

export default BeforHome;
