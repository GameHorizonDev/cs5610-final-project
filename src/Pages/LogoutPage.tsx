import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL, APP_AXIOS } from '../API/apiConfig';

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // Send the logout request to the server
                const response = await APP_AXIOS.post('/logout');
                if (response.status === 200) {
                    console.log(response.data.message); // Optional: Log success message
                } else {
                    console.error('Logout failed:', response.data.message);
                }
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                // Redirect the user to the login page after logout
                navigate('/login');
            }
        };

        handleLogout();
    }, [navigate]);

    return <p>Logging out...</p>; 
};

export default LogoutPage;
