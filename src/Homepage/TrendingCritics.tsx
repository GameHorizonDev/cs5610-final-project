import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdLocalMovies } from "react-icons/md";



import "./styles.css";


export default function TrendingCritics(){
    return(
        <div id="sm-critics-trending-section" className="d-none d-sm-block text-wrap border border-danger rounded-bottom mb-4 ps-2 pe-2 pt-3 pb-3">
            Trending Critics <br/>
            <MdLocalMovies /> Jane Doe <br/>
            <MdLocalMovies /> Pablo Garcia<br/>
            <MdLocalMovies /> John Doe <br/>
        </div>
    );
}