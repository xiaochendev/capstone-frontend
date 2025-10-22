import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";

export default function RequireRegisteredUser() {
  // const { user, cookies } = useAuth();   // Not using react-cookie anymore
  const { user }  = useAuth();

  // Still loading
  if (user === null) {
    return <div>Loading...</div>;
  }

  // // No token at all → not authenticated
  // if (!cookies.token) {
  //   return <Navigate to="/auth/login" />;
  // }

  // // Authenticated but user is a guest → must register
  // if (user?.isGuest) {
  //   return <Navigate to="/auth/login" />;
  // }

  return <Outlet />;
}
