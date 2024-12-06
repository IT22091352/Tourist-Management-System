import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddFAQs.css'; 


function AddFAQs() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    category: "",
    question: "",
    answer: ""
  });

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
      await axios.post("http://localhost:5000/faqs", inputs);
      history('/FAQdetails');
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  return (
    <div className="container">
      <div className="">
        <h1>Add FAQ</h1>
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
          <br></br>
          <Form.Group controlId="question">
            <Form.Label>Question</Form.Label>
            <Form.Control as="textarea" rows={5} name="question" onChange={handleChange} value={inputs.question} required />
          </Form.Group>
          <br></br>
          <Form.Group controlId="answer">
            <Form.Label>Answer</Form.Label>
            <Form.Control as="textarea" rows={5} name="answer" onChange={handleChange} value={inputs.answer} required />
          </Form.Group>
          <br></br>
          <Button type='submit' variant="primary">Submit</Button>
        </Form>
      </div>
    </div>
  );
}

export default AddFAQs;
