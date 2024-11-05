import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/sandbox/homepage">Sandbox Home</Link></li>
                <li><Link to="/sandbox/gamereviews/540">Game Reviews</Link></li>
                <li><Link to="/GameHorizon/Homepage">Homepage</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;