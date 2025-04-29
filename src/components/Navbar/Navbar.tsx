import  { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';
// import styles from './Navbar.module.css';


function Navbar() {
  const usercontext=useContext(userContext);
  // const {token}=usercontext || '';
  const setToken=usercontext?.setToken;
  function logout(){
      localStorage.removeItem("token");
      setToken(null);
  }
  return(
    <>
    
      {/* <nav>
        <ul className="flex gap-2">
          <li className="text-xl font-semibold text">Home</li>
          <li>Cart</li>
          <li>Products</li>
        </ul>
      </nav> */}

        <input type="text" />
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