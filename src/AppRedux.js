import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Cart from './components/Cart';
import RootLayout from './components/RootLayout';


function AppRedux() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element ={<RootLayout/>}>
        <Route index element={<Dashboard />}/>
        <Route path='/cart' element={<Cart />}/>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default AppRedux;


