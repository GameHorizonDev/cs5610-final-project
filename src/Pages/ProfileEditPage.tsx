import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '../API/apiConfig';

const ProfileEditPage: React.FC = () => {
    const [username, setUsername] = useState('Alice');
    const [email, setEmail] = useState('alice@example.com');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            const response = await axios.put(`${SERVER_BASE_URL}/user/profile`, {
                username,
                email,
                bio
            });
            setMessage('Profile updated successfully!');
            console.log('Profile updated:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile.');
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {message && <p>{message}</p>}
            <form>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Bio:</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </div>
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default ProfileEditPage;
