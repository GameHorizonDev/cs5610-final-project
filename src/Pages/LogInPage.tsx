import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL, APP_AXIOS } from '../API/apiConfig';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/login`, {
                email,
                password,
            });

            console.log('Login response:', response.data);

            // If login is successful, save the token (optional) and redirect
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/home'); // Redirect to the home page or any protected page
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error logging in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
