import React from 'react';
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import First from './First';
import Secure from './Secure';

const AppSimpleRoute = () => {
  return (
    <>
      <Router>
          <Routes>
            <Route path='/' element={<First />}/>
            <Route element={<ProtectedRoute />} >
                <Route path='/auth' element={<Secure />}/>
            </Route>
          </Routes>
      </Router>
    </>
  )
}

export default AppSimpleRoute
