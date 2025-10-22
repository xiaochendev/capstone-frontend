import RegisterForm from "../../components/AuthForms/RegisterForm";
import LoginForm from "../../components/AuthForms/LoginForm";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode'); // will be 'register' if URL has ?mode=register
  const [newUser, setNewUser] = useState(mode === 'register');

  return (
    <div className="auth-page">
        {newUser ? (
          <RegisterForm setNewUser={setNewUser} />
        ) : (
          <LoginForm setNewUser={setNewUser} />
        )}
    </div>
  );
}
