import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
  //  const navigate = useNavigate();

    const fetchUser = async () => {

        try {

            const response = await axios.get("http://localhost:8000/api/auth/me", { withCredentials: true });
            setUser(response.data);
            console.log(user);


        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    }


    const login = async (userDate) => {

        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", userDate, { withCredentials: true })
            // setUser(response.data.user);
            // console.log(response.data.user);


            if (response.data.message === "Login Successfully") {
                await fetchUser()
                return true;
            }
            return false;

        } catch (error) {
            setUser(null);
            console.log(error);

        }

    }

    useEffect(() => {
        fetchUser();
    }, [])


    const logout = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true })

            setUser(null)
           // navigate("/")

        } catch (error) {
            setUser(null);
            console.log("Logout Failed", error);

        }
    }
    return <AuthContext.Provider value={{ user, login, loading, logout }}>{children}</AuthContext.Provider>


}
