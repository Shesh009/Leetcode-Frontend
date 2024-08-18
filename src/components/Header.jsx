import React from "react";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom header">
      <Link
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png"
          alt="Lee"
          className="header-image"
        />
        <h5 style={{ color: "white" }}>Leetcode</h5>
      </Link>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/" className="nav-link" aria-current="page">
            <IoHomeOutline />
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/adduser" className="nav-link">
            <CgProfile />
            Add Profile
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
