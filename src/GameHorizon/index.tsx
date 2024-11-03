import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router";
import "./style.css";
import GameHorizonNavigation from './Navigation';
import ProfilePage from '../Pages/ProfilePage';
import Homepage from './Homepage';


export default function GameHorizon(){
    return(
        // "sm" is short for social media
        <div id="sm-gamehorizon">
            <GameHorizonNavigation />
            <div className="sm-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/GameHorizon/Homepage" />} />
                    <Route path="/Homepage/*" element={<Homepage />} />
                    <Route path="/Search" element={<h1>Search</h1>} />
                    <Route path="/Bookmarks" element={<h1>Bookmarks</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    );
}