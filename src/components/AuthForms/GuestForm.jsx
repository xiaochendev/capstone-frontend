import { useNavigate } from "react-router-dom";
import style from './Forms.module.css';
import { useAuth } from '../../context/authContext/authContext.jsx';

export default function GuestForm() {
  const nav = useNavigate();
  const { startAsGuest } = useAuth();

  async function handleGuestStart(e) {
    e.preventDefault();
    try {
      await startAsGuest();
      nav("/game"); // Go to protected route
    } catch (err) {
      console.error("Guest login failed:", err);
    }
  }

  return (
    <div className={style.forms}>
      {/* <form onSubmit={handleGuestStart}>
        <button type="submit">Continue as Guest</button>
      </form> */}
      <button onClick={handleGuestStart}>Continue as Guest</button>

    </div>
  );
}
