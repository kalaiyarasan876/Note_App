import { useEffect, useState } from "react";
import axios from 'axios';




const Profile = () => {

  const [user, setUser] = useState(null)
  const [error, setError] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // console.log("user", user, );
  // console.log("profileImage", profileImage);



  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/auth/me", { withCredentials: true });
      // console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  //console.log("user", user?.profile_image);


  const handleUploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile_image', profileImage);
    try {
      const response = await axios.post("http://localhost:8000/api/auth/upload-profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      fetchUser();
      setUser({ ...user, profile_image: response.data.profile_image });
      setError(false);
      // console.log(response.data);
      setProfileImage(null);

    } catch (error) {
      console.log(error);
      setError(error.response.data.message);

    }
  }



  useEffect(() => {
    fetchUser();
  }, [])


  if (!user && !error) return <div>Loading...</div>


  return (
    <>

      <div className="profile-container">

        <div className="profile-card">
          {error && <p className="error">{error} </p>}
          <div className="profile-title">
            <h1>Profile</h1>
          </div >
          <div className="profile-info">
            <p><strong>Username: </strong>
              {user.username}
            </p>
            <p><strong>Email: </strong>
              {user.email}
            </p>
            <p><strong>Contact: </strong>
              {user.contact || "N/A"}
            </p>


            {user.profile_image && <img src={`http://localhost:8000/${user?.profile_image}`} alt="profile" className='profile-img' />}



            <p><input type="file" accept='image/*' onChange={(e) => setProfileImage(e.target.files[0])} /></p>

            {profileImage && <button type="button" onClick={handleUploadImage} className='form-button'>Upload Profile Image</button>}


          </div>
        </div>
      </div>

    </>
  )
}

export default Profile;


