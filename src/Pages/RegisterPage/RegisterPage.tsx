import React, { useState } from 'react';
import styles from './RegisterPage.module.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<'Critic' | 'Audience'>('Critic'); // Default role
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(`Registration failed: ${error.message}`);
                return;
            }

            console.log('Registering with:', { email, password, role });
            alert('Registration successful!');
            navigate('/profile');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
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
                    <div className={styles['form-group']}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles['form-group']}>
                        <label>Role:</label>
                        <div className={styles['role-container']}>
                            <div className={styles['role-option']}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="Critic"
                                    checked={role === 'Critic'}
                                    onChange={() => setRole('Critic')}
                                />
                                Critic
                            </div>
                            <div className={styles['role-option']}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="Audience"
                                    checked={role === 'Audience'}
                                    onChange={() => setRole('Audience')}
                                />
                                Audience
                            </div>
                        </div>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
