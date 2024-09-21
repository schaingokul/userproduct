import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const UserDetails = () => {
  const {role} = useParams();
  const [allUser, setAllUser ] =useState([]);

  // Handle the toggle state for a specific user
  const handleToggle = (id) => {
    setAllUser((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  useEffect(()=>{
    const fetchUser = async() => {
      try {
        const response = await Axios.get(`http://localhost:5001/in/:${role}`);
        setAllUser(response.data.user);
      } catch (error) {
        console.log("UserDetails error: ",error.message);
      }
    }
    fetchUser()
  },[role])

  return (
    <div className='productheader'>
      <div className='productcontainer'>
        {allUser.map((user) => (
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