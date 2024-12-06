import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../cssFIle/Insurance.css";


export default function Insurancefirst() {
  const navigate = useNavigate();
  const [buttonStyle, setButtonStyle] = useState({});

  const handleHover = () => {
    setButtonStyle({
      ...buttonStyle,
      backgroundColor: "#0056b3",
    });
  };

  return (
    <div className="body-wrapper">
      {/* add background image */}
    <div className="insurance-container" style={{ backgroundImage: 'url("https://th.bing.com/th/id/R.e4b2e855ef3e4170b4fae3bc1f88e949?rik=deJg6UwDnv%2fEbg&riu=http%3a%2f%2fwww.manggaonline.com.my%2fwp-content%2fuploads%2f2020%2f02%2fcropped-bg.jpg&ehk=ITsgOZJayFvKoJ%2ff4pc4mDKLqDA27PAi2yxqvyt6QoA%3d&risl=&pid=ImgRaw&r=0")' }}>
      <div className="content-container">
        <h1 className="welcome-heading">
          Welcome to Travel Go Insurance Services
        </h1>
        <p className="welcome-text">
          Are you planning to jet set around the world? Before you pack your
          bags, get your travel insurance in order first. Did you know with a
          reliable insurance policy, you can be safeguarded against all
          unexpected events that might hinder your holiday? Continental
          Insurance provides you with an affordable, comprehensive travel
          insurance policy that will cover you in the event of flight delays,
          lost or delayed luggage, unforeseen medical emergencies, lost travel
          documents, Personal Accident Benefit and more. Leave your worries with
          us, enjoy your holiday.
        </p>
        <p className="welcome-text2">
          Travel Go Insurance also provides corporate travel solutions.
        </p>
        <div>
          <button
            className="get-insurance-btn"
            onClick={() => navigate("/pricing")}
            style={buttonStyle}
            onMouseEnter={handleHover}
            onMouseLeave={() =>
              setButtonStyle((prevStyle) => ({
                ...prevStyle,
                
              }))
            }
          >
            Get Insurance
          </button>
          {/* <button
            className="get-insurance-btn1"
            onClick={() => navigate("/dis")}
            style={buttonStyle}
            onMouseEnter={handleHover}
            onMouseLeave={() =>
              setButtonStyle((prevStyle) => ({
                ...prevStyle,
               
              }))
            }
          >
            Tourist Details
          </button> */}
        </div>
      </div>
    </div>
    </div>
  );
}
