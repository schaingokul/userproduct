import React, { useState } from 'react';
import Products from './Products.js';
import UserDetails from './UserDetails';
import { useNavigate, useParams } from 'react-router-dom';


const Dashboard = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState('user');

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