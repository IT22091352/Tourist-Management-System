import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UpdateFAQs() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/faqs/${id}`)
        .then((res) => res.data)
        .then((data) => {
          setInputs(data.faq);
        });
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/faqs/${id}`, inputs);
      history('/FAQdetails');
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  return (
    <div className="container">
      <h1>Edit FAQ</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category" onChange={handleChange} value={inputs.category} required>
              <option value="">Select a category</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Transportation">Transportation</option>
              <option value="Attractions/Tours">Attractions/Tours</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control type="text" name="question" onChange={handleChange} value={inputs.question || ""} required />
        </Form.Group>
        <Form.Group controlId="answer">
          <Form.Label>Answer</Form.Label>
          <Form.Control type="text" name="answer" onChange={handleChange} value={inputs.answer || ""} required />
        </Form.Group>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </div>
  );
}

export default UpdateFAQs;
