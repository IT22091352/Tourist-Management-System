import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Faq(props) {
  const { faq } = props;
  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/faqs/${faq._id}`)
      .then((res) => res.data)
      .then(() => history("/FAQdetails"));
  };

  // Return early if faq prop is undefined
  if (!faq) {
    return <div>Loading...</div>;
  }

  // Destructure properties from faq
  const { category, question, answer, _id } = props.faq;

  return (
    <div className="container">
      <div className="faq-info">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p>
          <strong>Question:</strong> {question}
        </p>
        <p>
          <strong>Answer:</strong> {answer}
        </p>
      </div>
      <div className="buttons">
        <Link to={`/FAQdetails/${_id}`} className="btn btn-primary mr-2">
          Edit
        </Link>{" "}
        <Button onClick={deleteHandler} variant="danger">
          Remove
        </Button>
      </div>
    </div>
  );
}
export default Faq;
