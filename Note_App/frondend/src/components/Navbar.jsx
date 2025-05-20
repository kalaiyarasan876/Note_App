import { Link } from "react-router";


const Navbar = () => {
  return (
    <>
      <nav>


        <div className="navbar-container">

          <div className="logo">
            <Link to="/">Note App</Link>
          </div>

          <div className="nav-links">
            {/* <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button type="button">Logout</button> */}

            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

          </div>
        </div>

      </nav>

    </>
  )
}

export default Navbar;