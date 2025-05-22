import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {

  const { user, logout } = useContext(AuthContext);
  
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   navigate()
  // }


  return (
    <>
      <nav>


        <div className="navbar-container">

          <div className="logo">
            <Link to="/">Note App</Link>
          </div>

          <div className="nav-links">
            {user ? <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              <button type="button" onClick={logout} >Logout</button>
            </> :
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>}



          </div>
        </div>

      </nav>

    </>
  )
}

export default Navbar;