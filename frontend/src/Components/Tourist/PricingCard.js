import React from "react";
import "../../cssFIle//PricingCard.css"; 
import { useNavigate } from "react-router-dom";

export default function PricingCard() {
    const navigate = useNavigate();

const insurancePackages = [
  { name: "GOLD Travel Insurance Package", 
    premium: "LKR 2314.96", 
    policyFee: "LKR 500.00",
    discount: "LKR 0.00" ,
    benifits: ["Comprehensive medical coverage",
               "Trip cancellation and interruption protection.",
               "Coverage for lost or delayed luggage.",
               "Emergency medical evacuation assistance."],
    amount: "LKR 2814.96"
              },

  { name: "SILVER Travel Insurance Package",
    premium: "LKR 1875.38",
    policyFee: "LKR 500.00",
    discount: "LKR 0.00" ,
    benifits:  ["Medical coverage for common travel emergencies.",
                "Trip interruption coverage for unexpected events.",
              "Assistance with lost or stolen belongings.",
              "24/7 travel assistance helpline."],
    amount: "LKR 2375.38"
    },

  { name: "PLATINUM Travel Insurance Package",
    premium: "LKR 1375.96",
    policyFee: "LKR 500.00",
    discount: "LKR 0.00" ,
    benifits:  ["Enhanced medical coverage with higher limits.",
                "Cancel for any reason coverage.",
                "Enhanced coverage for high-value belongings.",
                "24/7 travel assistance helpline."] ,
    amount: "LKR 1875.96"
  }
];

return(
  <div className="insurance-packages">
          <h2 className="insurance-packages-heading">Insurance Packages</h2><br/>
          <div className="package-container">
          {insurancePackages.map((ipackage, index) => (
          <div key={index} className="package-box">
          <h3 className="package-header">{ipackage.name}</h3>
          <p className="packagedetails">Basic premium: {ipackage.premium}</p>
          <p className="packagedetails">Policy Fee: {ipackage.policyFee}</p>
          <p className="packagedetails">Discount: {ipackage.discount}</p>
          <p className="packagedetails">Benifits: </p>
          <ul>
              {ipackage.benifits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul><br/><br/><br/>
          <h1 className="amount-button">{ipackage.amount}</h1>

          
          
          </div>
          ))}
          
       </div>
       <button
            className="get-register-btn"
            onClick={() => navigate("/add")}>Register to insurance</button>
    </div>
        
    
       
   
   
  
)
}

