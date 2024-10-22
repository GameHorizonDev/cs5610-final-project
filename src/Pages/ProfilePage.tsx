import React, { useState } from 'react';

const ProfilePage: React.FC = () => {
  const [username] = useState('Alice');
  const [email] = useState('alice@example.com');
  const [bio] = useState('Software engineer with a love for full-stack development and teaching.');

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