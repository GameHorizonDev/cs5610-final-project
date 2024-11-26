import React, { useState, useEffect } from 'react';
import { SERVER_BASE_URL, APP_AXIOS } from '../API/apiConfig';
import { Link } from 'react-router-dom'; 
import BookmarkedReviews from './BookmarkedReviews';
import FavoritedGames from './FavoritedGames';
import '../ProfilePage.css'; 

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
        const { username, email, bio } = response.data;
        setUsername(username);
        setEmail(email);
        setBio(bio);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  // return (
//     <div className="profile-container" style={{ display: 'flex', gap: '20px' }}>
//     <div style={{ flex: 1 }}>
//       <h2>Profile</h2>
//       <div>
//         <strong>Username:</strong>
//         <p>{username}</p>
//       </div>

//       <div>
//         <strong>Email:</strong>
//         <p>{email}</p>
//       </div>

//       <div>
//         <strong>Bio:</strong>
//         <p>{bio}</p>
//       </div>

//       <Link to="/profile/edit">
//         <button type="button">Manage Account</button>
//       </Link>
//     </div>

//     <div style={{ flex: 1 }}>
//         <BookmarkedReviews />
//         <FavoritedGames />
//       </div>
//        </div>
//   );
// };

return (
  <div className="profile-page-container">
    <div className="profile-left">
      <h3 className="section-header">PROFILE</h3>
      <div className="profile-info">
        <div className="avatar">
          <img
            src="https://via.placeholder.com/80"
            alt="User Avatar"
          />
        </div>
        <div>
          <h4 className="username">{username}</h4>
          <p className="email">{email}</p>
          <p className="bio">{bio}</p>
        </div>
      </div>
      <div className="manage-account-container">
      <Link to="/profile/edit" className="manage-account-link">
        Manage Account
      </Link>
      </div>
    </div>

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
  </div>
);
};
   

export default ProfilePage;
