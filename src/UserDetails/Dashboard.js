import React, { useEffect, useState } from 'react';
import Products from './Products.js';
import UserDetails from './UserDetails';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Dashboard = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const [toggle, setToggle] = useState('user');
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await Axios.get('http://localhost:5001/in', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching role:', error);
        setRole('');
      }
    };
    fetchRole();
  }, [token]);

  return (
    <div>
      <div className='header'>
          <div className='headerup'>
              <h1>Welcome, Gokul</h1>
              <h4 onClick={() => navigate('/')} style={{cursor: 'pointer'}}>Logout</h4>
          </div>
           {role === 'admin' ? 
           (<div>
                <div className='headerdown'>
                    <h2 style={{cursor: 'pointer'}} onClick={() => setToggle('product')}>Products</h2>
                    <h2 style={{cursor: 'pointer'}} onClick={() => setToggle('user')}>user</h2>
                </div>
                {toggle === 'product' ? <Products  /> : <UserDetails />}
            </div>) 
          :
          (<div>
            <div className='headerdown'>
                <h2>Products</h2>
            </div>
            <Products />
        </div>)}
      </div>
    </div>
  );
};

export default Dashboard;