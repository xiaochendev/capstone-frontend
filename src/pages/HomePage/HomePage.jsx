import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/AuthForms/LoginForm.jsx';
import RegisterForm from '../../components/AuthForms/RegisterForm.jsx';
import GuestForm from '../../components/AuthForms/GuestForm.jsx';
import { useAuth } from '../../context/authContext/authContext.jsx';


export default function HomePage() {
      const [newUser, setNewUser] = useState(false);
      const { user, cookies, logout } = useAuth();
      const nav = useNavigate();
      const isGuest = user?.isGuest === true;
      const isLoggedUser = user && !isGuest;

      function handleLogout() {
            logout(); 
            nav('/');
      }

    return (
      <div className="home-page">
            <h1> 🎮 🎮 🎮 </h1>
            {(isLoggedUser || isGuest) && (
                <>
                    <button onClick={() => nav('/game')}>Play More Games</button>
                    <button onClick={ handleLogout}>Log Out</button>
                </>
            )}

            {isGuest && (
                <>
                    <p><strong>You are playing as a GUEST!!! Save before losing it?</strong></p>
                    <button onClick={() => nav('/auth/login?mode=register')}>
                        Register Now
                    </button>
                </>
            )}

            {!user && (
                <div className='home-forms'>
                    {newUser 
                    ? (
                        <RegisterForm setNewUser={setNewUser} />) 
                    : (
                        <>
                            <LoginForm setNewUser={setNewUser} />
                            <GuestForm />
                        </>
                    )}
                </div>
            )}
      </div>
    );
}