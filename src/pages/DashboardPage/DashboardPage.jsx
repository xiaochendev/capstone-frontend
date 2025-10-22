import { useAuth } from "../../context/authContext/authContext";
import  ChartBoard  from "../../components/Dashboard/ChartBoard.jsx"
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/auth");
  }

  function handleRegister() {
    nav("/auth/login?mode=register");
  }


  return (
    <>
      {user?.isGuest && (
        <div>
            <p>⚠️ You're currently playing as a <strong>GUEST</strong>. Some features are for registered users only.</p>
            <button onClick={handleRegister}>Upgrade to Registered User</button>
            <p>🤡 No, not right now. I'll continue play as a <strong>GUEST</strong>.</p>
        </div>
      )}

      <button onClick={() => nav('/game')}>Play More Games</button>
      <ChartBoard />
    </>
  );
}