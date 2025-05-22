import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 // const API = "http://localhost:8000/api/auth/login";



  const { user, login, loading } = useContext(AuthContext);



  
/**
 * 
 * @param {*} e 
 * 
 *   const handleSubmit = async (e) => {
  
      e.preventDefault();
      const success = await login({ username, password });
      console.log(success);
      
      if (success) {
        navigate("/dashboard")
      } else {
        setError("Invalid credentials or login failed.");

      }
      
     try {
      
     } catch (error) {
            setError(error.response.data.message || "Registration failed");

     }
  }

 */

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login({ username, password });
      if (success) {
        navigate("/dashboard");
      } else {
        setError("Invalid credentials or login failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  if (loading) return <div>loading...</div>


  return (
    <>
      <div className="form-container">
        <div className="form-card">
          <div className="form-title">
            <h1>LOGIN</h1>
            {error && <p className="error">{error} </p>}
            <div className="form-group">
              <input type='username' placeholder='Username or Email' value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button onClick={handleSubmit} className='form-button'>LOGIN</button>
              <p>Don't have an account  <Link to={"/register"}>Sign up</Link> </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;