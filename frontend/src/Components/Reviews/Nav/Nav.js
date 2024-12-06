import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar" style={{ fontFamily: "Poppins, sans-serif" }}>
      <ul className="nav-links" style={{ fontFamily: "Poppins, sans-serif" }}>
        <li>
          <Link to="/packages">Admin part</Link>
        </li>

        <li>
          <Link to="/seereviews">Reviews</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
