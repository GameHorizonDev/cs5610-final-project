import React, { useState } from 'react';

const ProfileEditPage: React.FC = () => {
    const [username, setUsername] = useState('Alice');
    const [email, setEmail] = useState('alice@example.com');
    const [bio, setBio] = useState('');

    const handleSave = () => {
        console.log('Profile updated:', { username, email, bio });
    };

    return (
        <div>
            <h2>Edit Profile</h2>
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