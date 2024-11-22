import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaRegCommentDots, FaRegCircleUser } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { FaRegBookmark } from "react-icons/fa";


import "./styles.css";
import TrendingMovies from "./TrendingMovies";
import TrendingCritics from "./TrandingCritics";


const HomePage: React.FC = () => {
    return (
        <div id="sm-homepage">
            {/* Make the trendingNow section fixed to the right side of the div */}
            <div id="sm-trending-section" className="d-none d-sm-block float-end me-4">
                <TrendingMovies />
                <TrendingCritics />
            </div>


            <div id="sm-post-boundary">
                {/* Sample post #1 */}
                <div id="sm-sample-post" className="border border-danger">
                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                        <FaRegCircleUser />
                        <span className="d-inline-flex ms-1">
                            <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                        </span> <br />

                    </div>
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Title of the post display here)</p>
                    </div>


                    {/* Maybe using bootstrap's carousel to display picture */}
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                    </div>



                    <div className="d-flex bd-highlight mb-3">
                        <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                        <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                        <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                    </div>
                </div>

                <hr />

                {/* Sample post #2 */}
                <div id="sm-sample-post" className="border border-danger">
                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                        <FaRegCircleUser />
                        <span className="d-inline-flex ms-1">
                            <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                        </span> <br />

                    </div>
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Title of the post display here)</p>
                    </div>


                    {/* Maybe using bootstrap's carousel to display picture */}
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                    </div>



                    <div className="d-flex bd-highlight mb-3">
                        <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                        <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                        <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                    </div>
                </div>
                <hr />

                {/* Sample post #3 */}
                <div id="sm-sample-post" className="border border-danger">
                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                        <FaRegCircleUser />
                        <span className="d-inline-flex ms-1">
                            <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                        </span> <br />

                    </div>
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Title of the post display here)</p>
                    </div>


                    {/* Maybe using bootstrap's carousel to display picture */}
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                    </div>



                    <div className="d-flex bd-highlight mb-3">
                        <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                        <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                        <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                    </div>
                </div>

                <hr />

                <div id="sm-sample-post" className="border border-danger">
                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                        <FaRegCircleUser />
                        <span className="d-inline-flex ms-1">
                            <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                        </span> <br />

                    </div>
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Title of the post display here)</p>
                    </div>


                    {/* Maybe using bootstrap's carousel to display picture */}
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                    </div>



                    <div className="d-flex bd-highlight mb-3">
                        <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                        <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                        <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                    </div>
                </div>
                <hr />

                <div id="sm-sample-post" className="border border-danger">
                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                        <FaRegCircleUser />
                        <span className="d-inline-flex ms-1">
                            <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                        </span> <br />

                    </div>
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Title of the post display here)</p>
                    </div>


                    {/* Maybe using bootstrap's carousel to display picture */}
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                    </div>



                    <div className="d-flex bd-highlight mb-3">
                        <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                        <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                        <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                    </div>
                </div>

                <hr />

                <div id="sm-sample-post" className="border border-danger">
                    <div className="d-flex align-items-start ms-3 me-3 pt-4">
                        <FaRegCircleUser />
                        <span className="d-inline-flex ms-1">
                            <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                        </span> <br />

                    </div>
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Title of the post display here)</p>
                    </div>


                    {/* Maybe using bootstrap's carousel to display picture */}
                    <div className="d-flex align-items-start ms-3 me-3">
                        <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                    </div>



                    <div className="d-flex bd-highlight mb-3">
                        <div className="m-2 p-2 bd-highlight"><FcLike /></div>
                        <div className="m-2 p-2 bd-highlight"><FaRegCommentDots /></div>
                        <div className="ms-auto m-2 p-2 bd-highlight"><FaRegBookmark /></div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default HomePage;
