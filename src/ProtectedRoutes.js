import React from 'react'
import {Outlet, Navigate} from 'react-router-dom';
import Axios from 'axios';

const ProtectedRoutes = async () => {

  Axios.get('http://localhost:5000', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    

  return (
    <div>
        {getToken && header ? (<Outlet /> ) : (<Navigate to='/login' />)}
    </div>
  )
}

export default ProtectedRoutes;