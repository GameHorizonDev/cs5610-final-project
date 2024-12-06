import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import BookmarkedReviews from "./BookmarkedReviews";
import FavoritedGames from "./FavoritedGames";
import "../ProfilePage.css";

const UserProfilePage: React.FC = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [roleInfo, setRoleInfo] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile/${profileId}`);
        const { username, role } = response.data;
        setUsername(username);
        setRole(role);
        if (role === "critic") {
          setRoleInfo(response.data.isFeaturedCritic ? "Featured Critic!" : "Not a featured critic.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user profile.");
      }
    };

    fetchUserProfile();
  }, [profileId]);

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
            <p className="role">{role}</p>
            {roleInfo && <p className="roleInfo">{roleInfo}</p>}
          </div>
        </div>
      </div>
      {(role === "critic" || role === "audience") && (
        <div className="profile-right">
          <div className="card">
            <h3 className="section-header">BOOKMARKED REVIEWS</h3>
            <BookmarkedReviews userId={profileId} />
          </div>
          <div className="card">
            <h3 className="section-header">FAVORITED GAMES</h3>
            <FavoritedGames userId={profileId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
