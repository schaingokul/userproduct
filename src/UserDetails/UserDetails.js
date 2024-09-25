import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const UserDetails = () => {
  
  const [user, setUser ] =useState([]);
  const token = localStorage.getItem('token');

  const handleToggle = (id) => {
    setUser((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get('http://localhost:5001/in', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  return (
    <div className='productheader'>
      <div className='productcontainer'>
        {user.map((user) => (
          <div key={user.id} className='pcontainer'>
          <h4>User Name: {user.username}</h4>
          <p>Email: {user.email}</p>
          <p>Password:{user.password} </p>
          <p>CreatedBy: {user.createdby}</p>
          <p>CreateOn:{user.createdon} </p>
          <button onClick={() => handleToggle(user.id)}
                  style={{ color: user.isActive ? 'red' : 'black' }}
                  aria-label={user.isActive ? 'Deactivate User' : 'Activate User'}>
              {user.isActive ? 'Deactivate' : 'Activate'}
            </button>
        </div>
        ))}
      </div>
    </div>
  )
}

export default UserDetails