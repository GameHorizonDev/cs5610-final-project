import React, { useState } from "react";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import { useLocation, useNavigate } from "react-router-dom";
import "../ProfileEditorPage.css";

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state from the location
  const {
    username: initialUsername,
    email: initialEmail,
    password: initialPassword,
  } = location.state || {};

  const [username, setUsername] = useState(initialUsername || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState(initialPassword || "");

  const [message, setMessage] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      // Prepare the payload
      const payload: any = {};

      if (username !== initialUsername) payload["username"] = username;
      if (email !== initialEmail) payload["email"] = email;
      if (password !== initialPassword) payload["password"] = password;

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

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      // Send the logout request to the server
      const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/logout`);
      if (response.status === 200) {
        console.log(response.data.message);
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      navigate("/login");
    }
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
        <label className="input-label">New Password</label>
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

      {/* ACTION BUTTONS */}
      <div className="button-container">
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </div><br/><br/>

      {/* PROFILE */}
      <div className="settings-section">
        <h3 className="section-header">PROFILE</h3>
        <p>
          <span
            className="profile-link"
            onClick={handleProfile}
            style={{ cursor: "pointer" }}
          >
            My Profile
          </span>
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
