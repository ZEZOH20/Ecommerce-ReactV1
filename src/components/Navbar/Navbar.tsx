import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css';


function Navbar() {
  return(
    <>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signin">Signin</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
    </>
  )
};

export default Navbar;