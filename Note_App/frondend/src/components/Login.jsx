import React from 'react'

const Login = () => {
  return (
    <>
      <div className="form-container">
        <div className="form-card">
          <div className="form-title">
            <h1>LOGIN</h1>
            <div className="error">
              <div className="form-group">
                <input type='text' placeholder='Username' />
                <input type='password' placeholder='password' />
                <button className='form-button'>LOGIN</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;