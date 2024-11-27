import React, { useState } from "react";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../ProfileEditorPage.css";

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state from the location
  const {
    username: initialUsername,
    email: initialEmail,
    role: initialRole,
    password: initialPassword,
  } = location.state || {};

  const [username, setUsername] = useState(initialUsername || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [role, setRole] = useState(initialRole || "");
  const [password, setPassword] = useState(initialPassword || "");

  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      // Prepare the payload
      const payload: Record<string, string> = {};
      if (username) payload.username = username;
      if (email) payload.email = email;
      if (role) payload.role = role;
      if (password) payload.password = password;

      // Make the API call
      const response = await APP_AXIOS.patch(
        `${SERVER_BASE_URL}/user/update-user`,
        payload
      );
      setMessage("Profile updated successfully!");
      console.log("Profile updated:", response.data);

    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    navigate("/logout"); //
  };

  return (
    <div className="account-settings-container">
      <h1 className="page-title">Edit Profile</h1>
      <h2 className="section-header">Personal Information</h2>

      {/* PERSONAL INFORMATION */}
      <div className="settings-section">
        <label className="input-label">User Name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-input"
        />
      </div>

      <div className="settings-section">
        <label className="input-label">Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-input"
        />
      </div>

      <div className="settings-section">
        <label className="input-label">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-input"
        />
      </div>

      <div className="settings-section">
        <label className="input-label">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select-input"
        >
          <option value="critic">Critic</option>
          <option value="audience">Audience</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* ACTION BUTTONS */}
      <div className="button-container">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="update-button" onClick={handleSave}>
          Update
        </button>
      </div>

      {/* PROFILE */}
      <div className="settings-section">
        <h3 className="section-header">PROFILE</h3>
        <p>
          <Link to="/profile" className="profile-link">
            My Profile
          </Link>
        </p>
        <p>
          <span
            className="profile-link"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Log Out
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProfileEditPage;
