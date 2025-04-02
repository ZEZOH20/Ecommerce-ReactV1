import React, { useContext } from 'react';
import { userContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';
// import styles from './ProtectedRoute.module.css';

function ProtectedRoute(props) {

  const {token}=useContext(userContext);

    if(token){
      return props.children;
    }else{
      return <Navigate to={'/signin'}/>
    }
    
        //  {return token ? props.children : }
    
  
};

export default ProtectedRoute;