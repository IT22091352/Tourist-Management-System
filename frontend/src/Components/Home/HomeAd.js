import React from "react";
import "./HomeAd.css";

function HomeAd() {
  return (
    <div className="beforhome">
      {/* Hero Section */}
      <div className="hero-section" style={{backgroundImage: "url('https://source.unsplash.com/1100x800/?admin')"}}>
        <div className="hero-content">
          <h1>Welcome to Travel Go Admin Panel</h1>
          <p className="topic_1">
            Because the greatest part of a road trip isn’t arriving at your destination.
            <br />
            It’s all the wild stuff that happens along the way” - Emma Chase
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeAd;
