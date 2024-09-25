import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Outlet, Navigate } from 'react-router-dom';


const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState(false);
  const frontToken = localStorage.getItem('token');


  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await Axios.get("http://localhost:5001/in", {
          headers: {
            Authorization: `Bearer ${frontToken}`
          }
        });

        if (response.status === 200) {
          setAuth(true);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [loading]);

  if (loading) {
    return <div>Loading....</div>;
  }
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
