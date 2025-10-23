import { useAuth } from "../../context/authContext/authContext.jsx";
import { useEffect, useState } from "react";
import apiService from "../../utilities/apiService.mjs";
import { useNavigate } from "react-router-dom";
import style from './Board.module.css';

export default function ProfileBoard() {
  const { user, setUser, logout } = useAuth();
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");

  // load user profile
  useEffect(() => {
    apiService.getUser()
      .then(data => {
        setFormData({
          username: data.username || "",
          email: data.email || "",
          password: "",
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Failed to load user:", err);
        setError("Failed to load user info.");
        setLoading(false);
      });
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const updated = await apiService.updateUser(formData);
      setUser(updated.user);  // Update global user
      setEditing(false);
      nav("/dashboard"); // Redirect to board page
    } catch (err) {
      // console.error("❌ Update failed", err);
      // setError(err?.response?.data?.error || "Failed to update profile");
        if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);  
      } else {
        alert("Failed to update profile");
      }
    }
  }

  async function handleDelete() {
    if (!window.confirm("⚠️ Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      await apiService.deleteUser();
      logout();   // Clear user context
      nav("/"); // Redirect to home page
    } catch (err) {
      console.error("❌ Delete failed", err);
      setError("Failed to delete account");
    }
  }

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-board">
      <h2>Your Profile</h2>

      {!editing ? (
        <>
          <p><strong>Username:</strong> {formData.username}</p>
          <p><strong>Email:</strong> {formData.email || "N/A"}</p>
          <button className={style.btn} onClick={() => setEditing(true)}>Edit Profile</button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Username: </label>
            <input name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label>Email: </label>
            <input name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>New Password (optional): </label>
            <input name="password" type="password" value={formData.password} onChange={handleChange} />
          </div>
          <button className={style.btn} type="submit">Save Changes</button>
          <button className={style.btn} type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}

      <button className={style.btn} onClick={handleDelete} style={{ color: "red" }}>
        Delete Account
      </button>
    </div>
  );
}
