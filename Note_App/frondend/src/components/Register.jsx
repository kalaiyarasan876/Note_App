import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");


  const API = "http://localhost:8000/api/auth/register";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();

    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('contact', contact);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {


      await axios.post(API, formData, {
        method: 'post',
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      navigate("/login");

    } catch (error) {
      
      setError(error.response.data.message || "Registration failed");
    }

  };

  return (
    <>
      <div className="form-container">
        <div className="form-card">
          <div className="form-title">
            <h1>REGISTER</h1>

            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <input type='username' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'
                required />

              <input type="email" placeholder='Email' size="30" required value={email} onChange={(e) => setEmail(e.target.value)} />

              <input type='password' value={password} required onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
              <input type='tel' value={contact} required onChange={(e) => setContact(e.target.value)} placeholder='Contact' />
              <input type="file" accept='image/*' required placeholder="No file choose" value={profileImage} onChange={(e) => setProfileImage(e.target.files[0])} />
              <button className='form-button' onClick={handleSubmit}>Register</button>
              <p>Already have an account  <Link to={"/login"}>Sign in</Link> </p>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Register;