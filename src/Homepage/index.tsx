import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRegCircleUser } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FaRegBookmark, FaStar, FaSearch } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';


import "./styles.css";
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
                // 
                for (const ag of reviews) {
                    // console.log(ag)
                    const apiData = await APP_AXIOS.get(`${SERVER_BASE_URL}/games-api/byId/${ag.gameId}`);
                    ag.apiGameTitle = apiData.data.title;
                    ag.apiGameData = apiData.data;
                }
                // console.log(reviews)
                setUserReviews(reviews)
                setUsername(username);
                setUserId(_id);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        const fetchAllReviews = async () => {
            try {
                const response = await APP_AXIOS.get(`${SERVER_BASE_URL}/review/get-all/-1`);
                const reviewData = response.data
                for (const ag of reviewData) {
                    // console.log(ag)
                    const apiData = await APP_AXIOS.get(`${SERVER_BASE_URL}/games-api/byId/${ag.gameId}`);
                    ag.apiGameTitle = apiData.data.title;
                    ag.apiGameData = apiData.data;
                }
                setAllUserReviews(reviewData)
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

    console.log(userReviews);
    return (
        <div id="sm-homepage" className="body-homepage">
            {/* Search Bar */}
            <div className="sm-search-bar-container">
                <div id="sm-search-bar">
                    <input
                        placeholder="Search a game"
                        className="form-control float-start w-25 me-2 sm-game-search-bar"
                        onChange={(e) => { saveSearchTerm(e.target.value) }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { handleGameSearch(searchTerm) }
                        }}
                    />
                    <button id="sm-search-button">
                        <FaSearch size={16} />
                    </button>
                </div>
            </div>

            <div id="sm-post-boundary">
                {/* If the user logged in, display some of their recent review post at the top, then follow up by recently reviews */}
                {/* If the user is annonymous, just display recently reviews */}

                {/* This only display when there is a user logged in*/}
                {isLoggedIn && (
                    <div>
                        {/* Display the first 3 post made by the users if there is any*/}
                        {userReviews.length !== 0 && (
                            <div>
                                <h1 className="text-start"> My Reviews </h1> <hr />
                                {userReviews.slice(0, 3).map((userReview) => (
                                    <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`} className="text-decoration-none text-dark">
                                        <div id="sm-users-post" className="mb-3">

                                            <div className="d-flex align-items-start ms-3 me-3 pt-4">
                                                <FaRegCircleUser size={32} />
                                                <span className="d-inline-flex ms-1">
                                                    <p> {username} <b>posted</b> a review for <b>{userReview.apiGameTitle}</b> <span>&#183;</span> {userReview.rating / 2} <FaStar /></p>
                                                </span> <br />
                                            </div>

                                            {/* This is what the reviewer writes */}
                                            <div id="sm-reviewer-text" className="d-flex align-items-start flex-column ms-3 me-3"
                                                style={{
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    display: '-webkit-box'
                                                }}>
                                                <div className="text-start p-2">{userReview.text}</div>
                                            </div>
                                            <div className="d-flex align-items-center p-2">
                                                <img src={userReview.apiGameData.thumbnail} alt={userReview.apiGameTitle} style={{ marginBottom: '20px' }} className="img-fluid rounded mx-auto d-block" />
                                            </div>

                                            <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`}
                                                className="text-decoration-none text-dark">
                                                <button id="sm-read-more-button"> Read more... </button>
                                            </Link>

                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* If there are no users reviews, redirect them to a review page */}
                        {userReviews.length === 0 && (
                            <div>
                                <Link to={`/view-game/default`}
                                    className="text-decoration-none text-dark">
                                    <button>
                                        Check out some games to review!
                                    </button>
                                </Link>
                            </div>
                        )}

                        {/* Display the whatever is left in the review database */}
                        <h1 className="text-start pt-3"> Other Reviews </h1> <hr />
                        {allUserReviews.filter((user) => user.reviewerId._id !== userId).map((userReview) => (
                            <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`} className="text-decoration-none text-dark">
                                <div id="sm-sample-post" className="mb-3">
                                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                                        <FaRegCircleUser size={32} />
                                        <span className="d-inline-flex ms-1">
                                            <p> {userReview.reviewerId.username} <b>posted</b> a review on <b>{userReview.apiGameTitle}</b> <span>&#183;</span> {userReview.rating / 2} <FaStar /></p>
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
                                        <p className="text-start p-2">{userReview.text}</p>
                                    </div>
                                    <div className="d-flex align-items-center p-2">
                                        <img src={userReview.apiGameData.thumbnail} alt={userReview.apiGameTitle} style={{ marginBottom: '20px' }} className="img-fluid rounded mx-auto d-block" />
                                    </div>

                                    {/* When click on read more, go navigate into the review */}
                                    <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`}
                                        className="text-decoration-none text-dark">
                                        <button id="sm-read-more-button"> Read more... </button>
                                    </Link>


                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* This is just display the the recent reviews  */}
                {!isLoggedIn && (
                    // Sample post #1
                    <div>
                        <h1 className="text-start pt-3"> Other Reviews </h1> <hr />
                        {allUserReviews.filter((user) => user.reviewerId._id !== userId).map((userReview) => (
                            <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`} className="text-decoration-none text-dark">
                                <div id="sm-sample-post" className="mb-3">
                                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                                        <FaRegCircleUser size={32} />
                                        <span className="d-inline-flex ms-1">
                                            <p> {userReview.reviewerId.username} <b>posted</b> a review on <b>{userReview.apiGameTitle}</b> <span>&#183;</span> {userReview.rating / 2} <FaStar /></p>
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
                                        <p className="text-start p-2">{userReview.text}</p>
                                    </div>
                                    <div className="d-flex align-items-center p-2">
                                        <img src={userReview.apiGameData.thumbnail} alt={userReview.apiGameTitle} style={{ marginBottom: '20px' }} className="img-fluid rounded mx-auto d-block" />
                                    </div>

                                    {/* When click on read more, go navigate into the review */}
                                    <Link to={`/gamereviews/${userReview.gameId}/review/${userReview._id}`} className="text-decoration-none text-dark">
                                        <button id="sm-read-more-button">
                                            Read more...
                                        </button>
                                    </Link>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
