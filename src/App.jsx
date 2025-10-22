import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useAuth } from "./context/authContext/authContext.jsx";
import apiService from "./utilities/apiService.mjs";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import GamePage from "./pages/GamePage/GamePage";

// Components
import RequireRegisteredUser from "./components/RequireRegisteredUser";
import Nav from "./components/Nav/Nav";

function App() {
  const location = useLocation();
  // const { cookies, logout, user, setUser } = useAuth();

  // async function getUser() {
  //   try {
  //     let userData = await apiService.getUser(cookies.token);
  //     // login(userData, cookies.token);     // break login(FormData), cuz here sent obj, but login expect only email and password.
  //     setUser(userData)                     // set user directly, no login needed
  //   } catch (err) {
  //     logout();
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   if (cookies.token) {
  //     getUser();
  //   }
  // }, [cookies.token]);

  // hide nav only on HomePage
  const hideNav = location.pathname === '/'; 

  return (
    <>
      {!hideNav && <Nav />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<AuthPage />} />
            <Route path="/game" element={<GamePage />} />

          <Route element={<RequireRegisteredUser />}>
            <Route path="/dashboard" element={<DashboardPage /> } />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
