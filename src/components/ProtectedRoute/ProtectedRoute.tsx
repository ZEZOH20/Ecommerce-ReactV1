import React, { useContext } from 'react';
import { userContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';
// import styles from './ProtectedRoute.module.css';

function ProtectedRoute(props) {

  const {token}=useContext(userContext);

    return token? props.children: <Navigate to={'/signin'}/>
    // if(token){
    //   return ;
    // }else{
    //   return 
    // }
    
        //  {return token ? props.children : }
    
  
};

export default ProtectedRoute;