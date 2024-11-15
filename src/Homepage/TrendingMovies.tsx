import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";



import "./styles.css";


export default function TrendingMovies(){
    return(
        <div id="sm-movie-trending-section" className="d-none d-sm-block text-wrap border border-danger rounded-top mb-4 ps-2 pe-2 pt-3 pb-3">
            Trending Movies <br/>
            <MdLocalMovies /> Deadpool & Wolverine <br/>
            <MdLocalMovies /> Mulan <br/>
            <MdLocalMovies /> The Grinch <br/>
        </div>
    );
}