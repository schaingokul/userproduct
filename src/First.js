import Axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const First = () => {
    const [text, setText] = useState('');

    const navigate = useNavigate();

    const changeText = (e) => {
        setText(e.target.value);
    }

    const sendText = async(e) => {
        e.preventDefault();
        try {
            const response = await Axios.post("http://localhost:5001", { data: text });
            localStorage.setItem('token', response.data.token);
            navigate('/auth');
            setText(''); 
        } catch (error) {
            const err = error.response ? error.response.data : { message: "An error occurred" };
            console.log(`${err.success}, ${err.message}`);
    }
}
  return (
    <div>
      <input placeholder='TYPE DATA' name='data' value={text} onChange={changeText}/>
      <button onClick={sendText}>Send</button>
    </div>
  )

}

export default First
