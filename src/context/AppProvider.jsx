import AuthProvider from "./authContext/authContext.jsx";
import { CookiesProvider } from "react-cookie";

export default function AppProvider({ children }) {
  return (
    <CookiesProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
    </CookiesProvider>
  );
}
