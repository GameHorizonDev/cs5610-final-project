import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRegCircleUser } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FaRegBookmark, FaStar, FaSearch } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';


import "./styles.css";
import TrendingMovies from "./TrendingMovies";
import TrendingCritics from "./TrendingCritics";
// import * as userAPI from "../API/user";
import { SERVER_BASE_URL, APP_AXIOS } from "../API/apiConfig";
import SearchResultPage from "../Pages/SearchResultPage"

const HomePage: React.FC = () => {
    // Check to see if a user logged in or not
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userReviews, setUserReviews] = useState<any[]>([]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [allUserReviews, setAllUserReviews] = useState<any[]>([]);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchProfile = async () => {
            // Reset the boolean to false everytime they logged in
            // console.log("Logged in: ", isLoggedIn)
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/profile`);
                console.log("User profile info:", response.data)
                setIsLoggedIn(true)
                const { reviews, username, _id } = response.data;
                setUserReviews(reviews)
                setUsername(username);
                setUserId(_id);
                console.log("Logged in: ", isLoggedIn)
                console.log("User Reviews: ", reviews)
                console.log("User ID: ", _id)
                // const { username, email, role, password } = response.data;
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

        const fetchAllReviews = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/review/get-all/-1`);
                setAllUserReviews(response.data)
                console.log("All reviews: ", response.data)
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchAllReviews();
        fetchProfile();
    }, []);

    // For Search bar
    const saveSearchTerm = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    }

    const handleGameSearch = (queryString: string) => {
        navigate(`/search-results/${queryString}`);
        // Create an SPA for when clicking on the +Assignment button
        <Routes>
            <Route path="/search-results/:search_query?" element={<SearchResultPage header={"Search Results for Games"} />} />
        </Routes>
    }

    // console.log(getCurrUserInfo)
    return (
        <div id="sm-homepage" className="body-white body-homepage">
            {/* Search Bar */}
            <div className="sm-search-bar-container">
                {/* <span className="input-group-text"></span> */}
                <div id="search-bar" className="mb-3">
                    <input
                        placeholder="Search a game"
                        className="form-control float-start w-25 me-2 sm-game-search-bar"
                        onChange={(e) => { saveSearchTerm(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { handleGameSearch(searchTerm) }
                        }}
                    />
                    <button><FaSearch size={16} /></button>
                </div>
            </div>

            {/* Make the trendingNow section fixed to the right side of the div */}
            {/* <div id="sm-trending-section" className="d-none d-sm-block float-end me-4">
                <TrendingMovies />
                <TrendingCritics />
            </div> */}


            <div id="sm-post-boundary">
                {/* If the user logged in, display some of their recent review post at the top, then follow up by recently reviews */}
                {/* If the user is annonymous, just display recently reviews */}

                {/* This only display when there is a user logged in*/}
                {isLoggedIn && (
                    // Sample post #1
                    <div>
                        {userReviews.map((userReview) => (
                            <div id="sm-sample-post" className="border border-danger">
                                <div className="d-flex align-items-start ms-3 me-3 pt-4">
                                    <FaRegCircleUser />
                                    <span className="d-inline-flex ms-1">
                                        <p> {username} <b>posted</b> a review for <b>{userReview.gameId}(find game by game id)</b> <span>&#183;</span> {userReview.rating} </p>
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
                                    <p className="text-start">{userReview.text}</p>
                                </div>

                                <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`}
                                    className="text-decoration-none">
                                    <button> Read more... </button>
                                </Link>




                                {/* Clicking the comment icon will lead you to the post */}
                                <div className="d-flex bd-highlight mb-3">
                                    <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                                    <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                                </div>
                            </div>
                        ))}

                        {allUserReviews.filter((user) => user.reviewerId._id !== userId).map((userReview) => (
                            <div id="sm-sample-post" className="border border-danger">
                                <div className="d-flex align-items-start ms-3 me-3 pt-4">
                                    <FaRegCircleUser />
                                    <span className="d-inline-flex ms-1">
                                        <p> {userReview.reviewerId.username} <b>posted</b> a review on <b>{userReview.gameId}</b> <span>&#183;</span> {userReview.rating} <FaStar /></p>
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
                                    <p className="text-start">{userReview.text}</p>
                                </div>

                                {/* When click on read more, go navigate into the review */}
                                <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`}
                                    className="text-decoration-none">
                                    <button> Read more... </button>
                                </Link>



                                {/* Clicking the comment icon will lead you to the post */}
                                {/* Will have to rework these icon: Add or remove */}
                                <div className="d-flex bd-highlight mb-3">
                                    <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                                    <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* This is just display the the recent reviews  */}
                {!isLoggedIn && (
                    // Sample post #1
                    <div>
                        {allUserReviews.filter((user) => user.reviewerId._id !== userId).map((userReview) => (
                            <div id="sm-sample-post" className="border border-danger">
                                <div className="d-flex align-items-start ms-3 me-3 pt-4">
                                    <FaRegCircleUser />
                                    <span className="d-inline-flex ms-1">
                                        <p> {userReview.reviewerId.username} <b>posted</b> a review on <b>{userReview.gameId}</b> <span>&#183;</span> {userReview.rating} <FaStar /></p>
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
                                    <p className="text-start">{userReview.text}</p>
                                </div>

                                {/* When click on read more, go navigate into the review */}
                                <Link to={`/login`}
                                    className="text-decoration-none">
                                    <button> Read more... </button>
                                </Link>



                                {/* Clicking the comment icon will lead you to the post */}
                                {/* Will have to rework these icon: Add or remove */}
                                <div className="d-flex bd-highlight mb-3">
                                    <div className="m-2 p-2 bd-highlight">
                                        <Link to={`/login`}
                                            className="text-white">
                                            <FcLike />
                                        </Link>
                                    </div>
                                    <div className="ms-auto m-2 p-2 bd-highlight">
                                        <Link to={`/login`}
                                            className="text-white">
                                            <FaRegBookmark />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
