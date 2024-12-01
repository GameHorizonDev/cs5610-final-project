import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRegCircleUser } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FaRegBookmark } from "react-icons/fa";


import "./styles.css";
import TrendingMovies from "./TrendingMovies";
import TrendingCritics from "./TrendingCritics";
// import * as userAPI from "../API/user";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";

const HomePage: React.FC = () => {
    // Check to see if a user logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [reviews, setUserReviews] = useState<any[]>([]);


    useEffect(() => {
        const fetchProfile = async () => {
            // Reset the boolean to false everytime they logged in
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
                console.log("User profile info:", response.data)
                setIsLoggedIn(true)
                const { reviews } = response.data;
                setUserReviews(reviews)
                console.log("Logged in: ", isLoggedIn)
                console.log("User Reviews: ", reviews)
                // const { username, email, role, password } = response.data;
                // setUsername(username);
                // setEmail(email);
                // setRole(role);
                // setPassword(password);
            } catch (error) {
                console.error("Error fetching profile:", error);
                // setisLoggedIn(false)
                // console.log("Logged in: ", isLoggedIn)
                // setError("Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);


    // console.log(getCurrUserInfo)
    return (
        <div id="sm-homepage" className="body-white body-homepage">
            {/* Make the trendingNow section fixed to the right side of the div */}
            {/* <div id="sm-trending-section" className="d-none d-sm-block float-end me-4">
                <TrendingMovies />
                <TrendingCritics />
            </div> */}


            <div id="sm-post-boundary">
                {/* If the user logged in, display some of their recent review post at the top, then follow up by recently reviews */}
                {/* Now you only need to use "reviews" and map it out */}
                {isLoggedIn && (
                    // Sample post #1

                    <div id="sm-sample-post" className="border border-danger">
                        <div className="d-flex align-items-start ms-3 me-3 pt-4">
                            <FaRegCircleUser />
                            <span className="d-inline-flex ms-1">
                                <p> reviewerId.username <b>posted</b> a review on <b>gameId.title</b> <span>&#183;</span> (Rating here) </p>
                            </span> <br />

                        </div>

                        {/* This is what the reviewer writes */}
                        <div id="sm-reviewer-text" className="d-flex align-items-start ms-3 me-3"
                            style={{
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                display: '-webkit-box'
                            }}>
                            <p className="text-start">reviewSchema.text</p>
                        </div>

                        <button>Read more...</button>



                        {/* Clicking the comment icon will lead you to the post */}
                        <div className="d-flex bd-highlight mb-3">
                            <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                            <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                            <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                        </div>
                    </div>
                )}

                {/* If the user is annonymous, just display recently reviews */}











                <hr />


            </div>
        </div>
    );
};

export default HomePage;
