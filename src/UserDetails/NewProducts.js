import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';


const NewProducts = () => {
  const {role} = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    img: null,
  });


  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prevData) => ({
      ...prevData, 
      [name]: value,
    }));
  };

  const fileChange = (e) => {
    const file = e.target.files[0];
    setForm((prevData) => ({
      ...prevData, img: file
    }));
  };

  const handleUpload = (e) => {
    e.preventDefault()
    try {
      console.log(form);
      navigate(`/in`);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return (
    <div className="addproduct">
      <h3>Create New Product</h3>
        <div className='addcontainer'>
            <input type='text' name='title' placeholder='Title' value={form.title} onChange={handleChange}/><br/>
            <input type='text' name='description'placeholder='Description' value={form.description} onChange={handleChange} /><br/>
            <input type='text' name='price'placeholder='$: Prices' value={form.price} onChange={handleChange} /><br/>
            <input type='file' name='img' onChange={fileChange} />
        </div>
        <button onClick={handleUpload}>Upload</button>
        <div onClick={()=> navigate(`/in`)} style={{ cursor: 'pointer' }} >Back</div>
    </div>
  );
};

export default NewProducts;