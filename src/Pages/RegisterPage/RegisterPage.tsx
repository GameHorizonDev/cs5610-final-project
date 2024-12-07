import React, { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import { SERVER_BASE_URL, APP_AXIOS } from '../../API/apiConfig';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<"Critic" | "Audience">("Critic");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill out all required fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const finalRole = isAdmin ? "admin" : role.toLowerCase();

        try {
            const response = await APP_AXIOS.post(`${SERVER_BASE_URL}/register`, {
                username,
                email,
                password,
                role: finalRole,
            });

            if (response.status === 201) {
                alert("Registration successful!");
                navigate("/profile");
            } else {
                alert(`Registration failed: ${response.data.message}`);
            }
        } catch (error: any) {
            console.error("Error during registration:", error.response || error.message);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <div className={styles["form-group"]}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles["form-group"]}>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {!isAdmin && (
                        <div className={styles["form-group"]}>
                            <label>Role:</label>
                            <div className={styles["role-container"]}>
                                <div className={styles["role-option"]}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Critic"
                                        checked={role === "Critic"}
                                        onChange={() => setRole("Critic")}
                                    />
                                    Critic
                                </div>
                                <div className={styles["role-option"]}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="Audience"
                                        checked={role === "Audience"}
                                        onChange={() => setRole("Audience")}
                                    />
                                    Audience
                                </div>
                            </div>
                        </div>
                    )}
                    {isAdmin && (
                        <div className={styles["form-group"]}>
                            <label>Role:</label>
                            <input
                                type="text"
                                value="Admin"
                                disabled
                                className="form-control"
                                style={{ fontWeight: "bold", color: "red" }}
                            />
                        </div>
                    )}
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
