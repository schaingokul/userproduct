import React from 'react';
import Home from './UserDetails/Home.js';
import Dashboard from './UserDetails/Dashboard.js';
import NewProducts from './UserDetails/NewProducts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './UserDetails/style.css';
import ProtectedRoute from './ProtectedRoute.js';


const Appp = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route  path='/' element={<Home />}/>

          <Route path='/in/:role' element={<ProtectedRoute />}>
            {/* Dashboard Route */}
            <Route path='/in/:role' element={<Dashboard />} />
            {/* New Products Route */}
            <Route path='/in/:role/add' element={<NewProducts />} />
          </Route>

        </Routes>
      </Router>
        
    </div>
  )
}

export default Appp;


