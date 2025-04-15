import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
// import styles from './Navbar.module.css';


function Navbar() {
  const {token, setToken}=useContext(userContext);
  function logout(){
      localStorage.removeItem("token");
      setToken(null);
  }
  return(
    <>
    
      <nav>
        
      </nav>

        
        {/* <ul>
          {token ? 
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>: 
          <>
            <li><Link to="/signin">Signin</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </> }
       
        </ul> */}
    </> 
  )
};

export default Navbar;