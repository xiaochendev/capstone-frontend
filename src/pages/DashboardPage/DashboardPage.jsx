import { useAuth } from "../../context/authContext/authContext";
import  ChartBoard  from "../../components/Dashboard/ChartBoard.jsx"
import ProfileBoard from "../../components/Dashboard/ProfileBoard.jsx";
import Leaderboard from "../../components/Dashboard/LeaderBoard.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import style from '../../components/Dashboard/Board.module.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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
            <button className={style.btn} onClick={handleRegister}>Upgrade to Registered User</button>
            <p>🤡 No, not right now. I'll continue play as a <strong>GUEST</strong>.</p>
        </div>
      )}
      <button className={style.btn} onClick={() => nav('/game')}>Play More Games</button> 
      <button className={style.btn} onClick={() => setShowLeaderboard(!showLeaderboard)}>
        {showLeaderboard ? "Hide Top 10" : "🏆 Top 10 among all"}
      </button>

      {showLeaderboard && (
        <div style={{ marginTop: "1rem" }}>
          <Leaderboard />
        </div>
      )}

      {!user?.isGuest && (
        <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
          <div style={{ flex: "1" }}>
            <ProfileBoard />
          </div>
          <div style={{ flex: "2" }}>
            <ChartBoard />
          </div>
        </div>
      )}

      
    </>
  );
}