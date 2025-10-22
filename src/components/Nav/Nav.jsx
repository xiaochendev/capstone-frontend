import style from "./Nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";

export default function Nav() {
  const { logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav('/');
  }

  return (
    <nav className={style.nav}>

        <Link to={"/dashboard"}>
          <h3>dashboard</h3>
        </Link>

        <a onClick={handleLogout} >
          <h3>Logout</h3>
        </a>
    </nav>
  );
}
