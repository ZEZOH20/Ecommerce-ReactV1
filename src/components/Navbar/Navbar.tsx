import  {  useContext } from 'react';
import { Link, Navigate, NavLink, redirect } from 'react-router-dom';
// import { userContext } from '../../Context/UserContext';
// import { userContext } from '../../Context/UserContext';
import { UserContext } from '../../Context/UserContext';
// import styles from './Navbar.module.css';
import Signin from './../Signin/Signin';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate= useNavigate(); // for programmatic routing
  //state
  // const[cartItems, setCartItems]=useState(0);
  // const usercontext=useContext(userContext);
  const {token}=useContext(UserContext);
  function logout(){
      localStorage.removeItem("token");
      console.log("before redirecting");
      navigate("/signin"); // redirecting to login page
      console.log("After redirecting");
      // setToken(null);
  }
  const loggedNavbarLinks=[
    {
      title:"Home",
      path:"/"
    },
    {
      title:"Cart",
      path:"/cart"
    },
    {
      title:"Products",
      path:"/Products"
    },
    {
      title:"Categories",
      path:"/categories"
    }, 
  ];

  const notLoggednavbarLinks=[
    {
      title:"Signin",
      path:"/signin"
    }, 
    {
      title:"Signup",
      path:"/signup"
    }, 
  ]
  return(
    <>
    <header>
      <nav>
        <ul className="bg-blue-500 flex justify-center items-center h-15 ">
          {token ? 
          <>
            {loggedNavbarLinks.map(navbarLink=>{
              if(navbarLink.title==='Cart'){
                return <>
                  
                  <li className="text-xl font-bold text-white mr-4 relative after:content-[{}] after:absolute after:right-[-12px] after:top-[-5px] after:bg-blue-500 after:rounded-full"><Link to={navbarLink.path}>{navbarLink.title}</Link></li>
                  {/* <div className="mr-4 absolute ">1</div> */}
                </>
                
              }
              return <li className="text-xl font-bold text-white mr-4"><NavLink to={navbarLink.path}>{navbarLink.title}</NavLink></li>
            })}
            <li className="text-xl font-bold text-white mr-4 absolute right-5 cursor-alias"><button onClick={logout}>Logout</button></li>
          </>: 
          <>
          <ul className="bg-blue-500 flex justify-end items-center h-15 ">
            {
              notLoggednavbarLinks.map(link=>{
                return <li className="text-xl font-bold text-white mr-4"><NavLink to={link.path}>{link.title}</NavLink></li>
              })
            }
          </ul>
            
          </> }
        </ul>
      </nav>
    </header>
  
    </> 
  )
};

export default Navbar;