import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";


export default function Homepage(){
    return (
        <div id="sm-homepage">
            <h1 id="sm-homepage-title">This is the Homepage</h1> <hr />

            <div id="sm-sample-post"className="border border-danger">
                <div className="d-flex align-items-start ms-3 pt-4">
                    <FaRegCircleUser /> 
                    <span className="d-inline-flex ms-1"> 
                        <p> user_name <b>posted</b> a review on <b>"game_name"</b> <span>&#183;</span> (Date here) </p>
                    </span> <br/>
                    
                </div>
                <div className="d-flex align-items-start ms-3">
                    <p className="text-start">(Title of the post display here)</p>
                </div>


                {/* Maybe using bootstrap's carousel to display picture */}
                <div className="d-flex align-items-start ms-3">
                    <p className="text-start">(Optional in-game picture here if the user post it up)</p>
                </div>
                
            </div>
        </div>
    );
}