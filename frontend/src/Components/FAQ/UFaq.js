import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Faq(props) {
  // Destructure properties from props
  const { question, answer } = props.faq;

  return (
    <div className="container">
      <div className="faq-info">
        <p>
          <strong>{question}</strong>
        </p>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default Faq;
