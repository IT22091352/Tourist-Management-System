import React, { useEffect, useState } from 'react';
import axios from "axios";
import Faq from './Faq';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Faqs.css'; 

function Faqs() {
  const [faqsByCategory, setFaqsByCategory] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchHandler = async () => {
      const response = await axios.get("http://localhost:5000/faqs");
      const faqs = response.data.faqs;
      const groupedFaqs = groupFaqsByCategory(faqs);
      setFaqsByCategory(groupedFaqs);
      setFilteredFaqs(groupedFaqs); // Initialize filteredFaqs with all FAQs
    };
    fetchHandler();
  }, []);
//divided by category
  const groupFaqsByCategory = (faqs) => {
    const groupedFaqs = {};
    faqs.forEach((faq) => {
      if (!groupedFaqs[faq.category]) {
        groupedFaqs[faq.category] = [];
      }
      groupedFaqs[faq.category].push(faq);
    });
    return groupedFaqs;
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    filterFaqs(inputValue, selectedCategory);
  };
//FAQ search
  const filterFaqs = (inputValue, category) => {
    let filtered = Object.fromEntries(
      Object.entries(faqsByCategory).map(([cat, faqs]) => [
        cat,
        faqs.filter((faq) =>
          faq.question.toLowerCase().includes(inputValue.toLowerCase()) ||
          faq.category.toLowerCase().includes(inputValue.toLowerCase()) ||
          faq.answer.toLowerCase().includes(inputValue.toLowerCase())
        ),
      ])
    );
    if (category) {
      filtered = {
        [category]: filtered[category]
      };
    }
    setFilteredFaqs(filtered);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterFaqs(searchInput, category);
  };

  return (
    <div className="container-fluid">
      <h1 className="page-title"></h1><br></br>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ width: '48%' }}
        />
      </div><br></br>
      <div className="sidebar">
        <h3>Categories</h3>
        <ul>
          {Object.keys(faqsByCategory).map((category, index) => (
            <li key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
          ))}
        </ul>
      </div>
      <Link to='/AddFAQs' className="btn btn-primary" style={{ marginLeft: '400px' }}>Add FAQ</Link>

      <br></br><br></br>
      {Object.entries(filteredFaqs).map(([category, faqs]) => (
        <div key={category}>
          <h2>{category}</h2>
          <div className="faqs-list">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <Faq faq={faq} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Faqs;
