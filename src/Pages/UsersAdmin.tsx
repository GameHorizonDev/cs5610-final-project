import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaUserCircle } from "react-icons/fa";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

export default function UsersAdmin() {
    const [users, setUsers] = useState<any[]>([]);
    const [currentUserId, setCurrentUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUserId = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/user/getCurrId`);
                setCurrentUserId(response.data);
            } catch (error) {
                console.error("Failed to fetch current user ID:", error);
            }
        };

        const getAllUsers = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/user/all`);
                setUsers(response.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchCurrentUserId();
        getAllUsers();
    }, []);

    const handleDelete = async (userId: string, username: string) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the user: ${username}?`);
        if (!isConfirmed) return;

        try {
            await APP_AXIOS.delete(`${SERVER_BASE_URL}/user/delete/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

            console.log(userId + " vs " + currentUserId);
            if (userId === currentUserId) {
                await APP_AXIOS.post(`${SERVER_BASE_URL}/logout`);
                navigate("/login");
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Users Administration</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user._id} className="align-middle">
                            <td className="text-center">
                                <FaUserCircle className="me-2 fs-1 text-secondary" />
                                <span>{user.username}</span>
                            </td>
                            <td className="text-center">{user.email}</td>
                            <td className="text-center">{user.role}</td>
                            <td className="text-center">
                                {new Date(user.createdAt).toLocaleString()}
                            </td>
                            <td className="text-center">
                                {new Date(user.updatedAt).toLocaleString()}
                            </td>
                            <td className="text-center">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id, user.username)}
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
