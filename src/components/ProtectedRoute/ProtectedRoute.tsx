import React, { useContext } from 'react';
// import { UserContext } from '../../Context/UserContext';
import { UserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';
// import styles from './ProtectedRoute.module.css';


function ProtectedRoute({children }:{children: React.ReactNode}) {

  const {token}=useContext(UserContext);
  // const token='';
    return token? <>{children}</>: <Navigate to={'/signin'}/>
    // if(token){
    //   return ;
    // }else{
    //   return 
    // }
    
        //  {return token ? props.children : }
    
  
};

export default ProtectedRoute;