import style from "./Forms.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext/authContext";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ setNewUser }) {
  const { signUp, user, upgradeGuest } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [isUpgrading, setIsUpgrading] = useState(false);

  // Detect if user is a guest
  useEffect(() => {
    if (user && user.username?.startsWith("guest_") && user?.isGuest) {
      setIsUpgrading(true);
    }
  }, [user]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (formData.password !== formData.password2)
        throw new Error("Password Dont Match");

      const payload = 
        { username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.password2
        };
      if (isUpgrading) {
        await upgradeGuest(  
          {username: formData.username,
          email: formData.email,
          password: formData.password});
      } else {
        await signUp(payload);
      }


      nav("/game"); // Go straight to protected route
    } catch (err) {
      // console.error(err.message);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);  // or show error message nicely in the UI
        } else {
          alert("An unexpected error occurred");
        }
    }
  }

  const handleClick = () => {
    setNewUser(false);
  };

  return (
    <div className={style.forms}>
      <h2>{isUpgrading ? 'Upgrade Your Account' : 'Register'}</h2>
      {isUpgrading && (
        <p style={{ textAlign: "center", marginBottom: "1rem" }}>
          You're currently playing as a guest. Upgrade to save progress & history permanently.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
          />{" "}
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            minLength="6"
          />{" "}
        </label>
        <input
          type="password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          placeholder="Confirm Password"
          minLength="6"
        />
        <input type="submit" value="Sign Up" />
      </form>
      {!isUpgrading && (
        <p>
          Already have an account? {" "}
          <button onClick={handleClick}>Sign In</button>
        </p>
      )}
      
    </div>
  );
}
