// import { useCookies } from "react-cookie";
import { createContext, useMemo, useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true; // ✅ must include this in requests that send or expect cookies, *important for cookies to persist across origins


const AuthContext = createContext();  

export function AuthProvider({ children }) {
  // const [cookies, setCookies, removeCookie] = useCookies();
  const [user, setUser] = useState(null);   
  const connStr = "http://localhost:3000";

  // Fetch user using token from cookies
  async function fetchUser() {
      // const token = tokenFromParam || cookies.token;

      try {
        // try registered user
        const res = await axios.get(`${connStr}/auth`);   
        setUser({ ...res.data, isGuest: false });

        console.log("✅ Fetched user:", res.data); 
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Try guest info
          try {
            const guestRes = await axios.get(`${connStr}/auth/guest/info`);
            setUser({...guestRes.data, isGuest:true});

            console.log('✅ Fetched guest user:', guestRes.data);
          } catch (guestErr) {
            console.warn("❌ Guest token invalid too, logging out");
            logout();
          }
        } else {
          // All failed
          console.error("❌ Failed to fetch user:", error.message);
          logout();   // clear cookies if token is invalid
        }
      }
    }

  //  Called fetchUser() after login/signup to refresh user state
  async function signUp(formData) {
    // console.log("Register payload:", formData);

    try { 
      let res = await axios.post(`${connStr}/auth/register`, formData);
      console.log("Register response:", res.data); 
      
      // setCookies("token", res.data.token);  // Store token immediately
      // await fetchUser(res.data.token); // Fetch user info after signup

      await fetchUser(); // No need to handle token manually

    } catch (error) {
      // console.error("❌ Registration error:", error.response?.data || error.message);
      // throw error; 

      // log errors explicitly, print the array of error objects
      if (error.response?.data?.errors) {
          console.error("❌ Registration errors:", error.response.data.errors);
        } else {
          console.error("❌ Registration error:", error.response?.data || error.message);
        }
        throw error; 
      }
    }


  async function login(formData) {

    if (!formData.email || !formData.password) {
      // console.error("❌ Invalid login data:", formData);

      throw new Error("Email and password are required");
    }

    try {
      console.log("Logging in with:", formData);

      let res = await axios.post(`${connStr}/auth/login`, formData);
      // setCookies("token", res.data.token);
      // await fetchUser(res.data.token);    // use token immediatly 
      
      console.log("✅ Login successful");
      await fetchUser();
    } catch (error) {
      console.error("❌ Login error:", error.message);
      throw error; 
    }
  }

  async function logout() {
    // ["token"].forEach((token) => removeCookie(token));
    // setUser(null);
    try {
      await axios.post(`${connStr}/auth/logout`);
    } catch (err) {
      console.warn("Logout failed on server:", err.message);
    } finally {
      setUser(null);
    }
  }

  async function startAsGuest() {
    try {
      let res = await axios.post(`${connStr}/auth/guest`);
      // const guestToken = res.data.token;

      // // Save and set the token for authMiddleware to validate
      // setCookies('token', guestToken, {
      //   path:'/',
      //   maxAge: 86400000,    // 1 day in sec
      //   sameSite: 'strict',
      //   secure: false,      // false in devlopment, set to True in prod w HTTPS
      // })   
    
      // // wait a moment to let browser set the cookie
      // await new Promise((resolve) => setTimeout(resolve, 200))
      // await fetchUser();

      // ✅ Immediately use response data instead of calling fetchUser
      setUser({ ...res.data.user, isGuest: true }); 
      return res.data;

    } catch (error) {
      console.error("❌ Failed to start as guest:", error.message);
      logout();
      throw error;
    }
  }

  // Auto-fetch user when token changes
  // useEffect(() => {
  //   if (cookies.token) {
  //     fetchUser();
  //   } else {
  //     setUser(null);
  //   }
  // }, [cookies.token]); 
  useEffect(()=> {
    fetchUser()     // auto-fetch user
  }, []); 

  async function upgradeGuest(data) {
  const res = await axios.post(`${connStr}/auth/upgrade`, data);
  setUser(res.data.user);
  }

  const value = useMemo(
    () => ({
      user,
      // cookies,
      login,
      signUp,
      logout,
      startAsGuest,
      setUser,
      upgradeGuest,
    }),
    [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
