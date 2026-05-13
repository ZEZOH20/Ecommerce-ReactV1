import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContextValue';
import { Navigate } from 'react-router-dom';


function ProtectedRoute({children }:{children: React.ReactNode}) {

  const {token}=useContext(UserContext);
    return token? <>{children}</>: <Navigate to={'/signin'}/>
};

export default ProtectedRoute;
