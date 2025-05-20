

const Register = () => {
  return (
    <>
      <div className="form-container">
        <div className="form-card">
          <div className="form-title">
            <h1>REGISTER</h1>
            <div className="error">
              <div className="form-group">
                <input type='text' placeholder='Username' />
                <input type='email' placeholder='email' />
                <input type='password' placeholder='password' />
                <input type='contact' placeholder='contact' />
                <input type="file" accept='image/*' placeholder="No file choose" />
                <button className='form-button'>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;