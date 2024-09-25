import React from 'react';
import Home from './UserDetails/Home.js';
import Dashboard from './UserDetails/Dashboard.js';
import NewProducts from './UserDetails/NewProducts.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './UserDetails/style.css';
import ProtectedRoute from './ProtectedRoute.js';


const AppUser = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route  path='/' element={<Home />}/>
          
          <Route  element={<ProtectedRoute />}>
            {/* Dashboard Route */}
            <Route path='/in' element={<Dashboard />} />
            {/* New Products Route */}
            <Route path='/in/add' element={<NewProducts />} />
          </Route>

        </Routes>
      </Router>
        
    </div>
  )
}

export default AppUser;


