import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../API/apiConfig';

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${SERVER_BASE_URL}/user/profile`);
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
    <div>
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
    </div>
  );
};

export default ProfilePage;
