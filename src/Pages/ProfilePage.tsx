import React, { useState, useEffect } from "react";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import { useNavigate, Link } from "react-router-dom";
import BookmarkedReviews from "./BookmarkedReviews";
import FavoritedGames from "./FavoritedGames";
import "../ProfilePage.css";


const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [roleInfo, setRoleInfo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
        const { username, email, role, password } = response.data;
        console.log(response.data);
        setUsername(username);
        setEmail(email);
        setRole(role);
        setPassword(password);
        if (role === 'admin') {
          setRoleInfo(`Admin permissons: ${response.data.adminPermissions}`);
        } else if (role === "audience") {
          setRoleInfo(`Membership level: ${response.data.membershipLevel}`);
        } else if (role === "critic") {
          let criticRoleString;
          if (response.data.isFeaturedCritic) {
            criticRoleString = "Featured Critic!";
          } else {
            criticRoleString = "Not a featured critic.";
          }
          setRoleInfo(criticRoleString)
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile.");
        navigate("/login"); 
      }
    };

    fetchProfile();
  }, []);


  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-left">
        <h3 className="section-header">PROFILE</h3>
        <div className="profile-info">
          <div className="avatar">
            <img src="https://via.placeholder.com/80" alt="User Avatar" />
          </div>
          <div>
            <h4 className="username">{username}</h4>
            <p className="email">{email}</p>
            <p className="role">{role}</p>
            <p className="roleInfo">{roleInfo}</p>
          </div>
        </div>
        <div className="manage-account-container">
          <Link
            to="/profile/edit"
            className="manage-account-link"
            state={{
              username,
              email,
              password,
            }}
          >
            Manage Account
          </Link>
        </div>
      </div>

    {(role === "critic" || role === "audience") && (
      <div className="profile-right">
        <div className="card">
          <h3 className="section-header">BOOKMARKED REVIEWS</h3>
          <BookmarkedReviews />
        </div>
        <div className="card">
          <h3 className="section-header">FAVORITED GAMES</h3>
          <FavoritedGames />
        </div>
      </div>
      )}
    </div>
  );
};

export default ProfilePage;
