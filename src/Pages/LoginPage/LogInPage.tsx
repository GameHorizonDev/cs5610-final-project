import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL, APP_AXIOS } from '../../API/apiConfig';
import styles from './LoginPage.module.css'; // 引入样式文件

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
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/Homepage/HomePage');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Error logging in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Login</h2>
                {error && <p className={styles['error-message']}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className={styles['form-group']}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
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
        </div>
    );
};

export default LoginPage;
