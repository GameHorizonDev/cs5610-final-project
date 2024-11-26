import React, { useState, useEffect } from 'react';
import { SERVER_BASE_URL, APP_AXIOS } from '../API/apiConfig';
import { Link } from 'react-router-dom'; 
import BookmarkedReviews from './BookmarkedReviews';

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

  return (
    <div className="profile-container" style={{ display: 'flex', gap: '20px' }}>
    <div style={{ flex: 1 }}>
      <h2>Profile</h2>
      <div>
        <strong>Username:</strong>
        <p>{username}</p>
      </div>

      <div>
        <strong>Email:</strong>
        <p>{email}</p>
      </div>

      <div>
        <strong>Bio:</strong>
        <p>{bio}</p>
      </div>

      <Link to="/profile/edit">
        <button type="button">Manage Account</button>
      </Link>
    </div>

    <div style={{ flex: 1 }}>
        <BookmarkedReviews />
      </div>
       </div>
  );
};

export default ProfilePage;
