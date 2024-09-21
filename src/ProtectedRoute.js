import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useParams} from 'react-router-dom';
import Axios from 'axios';

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthentication] = useState(false); 
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem('token');
  const {role} = useParams();

  useEffect(() => {
    const protect = async () => {
      try {
        await Axios.get(`http://localhost:5001/in/:${role}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setIsAuthentication(true);
      } catch (error) {
        setIsAuthentication(false); 
      } finally {
        setLoading(false); 
      }
    };
    protect();
  }, [role, token]);

  if (loading) {
    return <div>Loading.....</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />; 
};

export default ProtectedRoute;
