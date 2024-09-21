import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';


const Home = () => {
  const navigate = useNavigate(); 
  const [toggle, setToggle] = useState('login');
  const [isError, setIsError] = useState('');

  const [form, setForm] = useState({
    role: '',
    username: '',
    email: '',
    password:'',
    isBoolean: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({...prevData, [name]: value}));
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
        const { email, password, role } = form; 
        const response = await Axios.post('http://localhost:5001/login', { email, password, role });
        console.log(response.data);
        const token = response.data.token;
        if (token) {
            localStorage.setItem('token', token);
            navigate(`/in/:${role}`);
        } else {
            setIsError('Login failed: No token received.');
        }
    } catch (error) {
        setIsError(error?.response?.data?.message);
    } finally {
        setForm({ role: '', username: '', email: '', password: '', isBoolean: true });
    }
  }

  const handleSignup = async(e) => {
    e.preventDefault();
    try {
      const {username, role, email, password, isBoolean } = form;
      const response = await Axios.post('http://localhost:5001/signup', {username, role, email, password, isBoolean });
      const token  = response.data.token;
      
      if(token){
        localStorage.setItem('token', token);
        navigate(`/in/${role}`);
      }else {
        setIsError('Login failed: No token received.');
      }

      // Reset form fields
      setForm({
        role: '',
        username: '',
        email: '',
        password:'',
        isBoolean: true,
        date: '',
        })
    } catch (error) {
      setIsError(error?.response?.data?.message);
        console.error('Error during signup:', error);
    }
  }

  return (
    <div className='homepage'>
        <h1>Welcome to Home Pages</h1>
        <div className='homecontainer'>
          {toggle === 'login' ? 
          (<form className='login' onSubmit={handleLogin}>
                <h4>Login</h4>
                <div className='role'>
                  <select name='role' value={form.role} onChange={handleChange} required>
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                  </select>
                </div>

                <div className='logincontainer'>
                    <input type='text' name='email' placeholder='Email' value={form.email} onChange={handleChange} required/><br/>
                    <input type='password' name='password' placeholder='Password' value={form.password} onChange={handleChange} required/><br/>
                    <button >Login</button>
                </div>
                {isError && <p style={{ color: 'red' }}>{isError}</p>}
                <p className='homeend' onClick={() => setToggle('signup')} style={{cursor: 'pointer'}}>Create an Account ? </p>
            </form>) 
          : 
          (<form className='sigup'  onSubmit={handleSignup}>
                <h4>SignUp</h4>
                <div className='role'>
                  <select name='role' value={form.role} onChange={handleChange} required>
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                  </select>
                </div>

                <div className='logincontainer'>
                    <input type='text' name='username' placeholder='Username' value={form.username} onChange={handleChange} required/><br/>
                    <input type='text' name='email' placeholder='Email'value={form.email} onChange={handleChange} required/><br/>
                    <input type='password' name='password' placeholder='Password' value={form.password} onChange={handleChange} required/><br/>
                    <button >Signup</button>
                </div>
                {isError && <p style={{ color: 'red' }}>{isError}</p>}
                <p onClick={() => setToggle('login')} style={{cursor: 'pointer'}}>Already have an account ? </p>
            </form>)}
        </div>
    </div>
  )
}

export default Home;