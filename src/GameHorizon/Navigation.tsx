import { FaRegBookmark } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";


export default function GameHorizonNavigation() {
    const { pathname } = useLocation();
    const links = [
      { label: "Home",      path: "/GameHorizon/Homepage",   icon: IoHomeOutline },
      { label: "Search",    path: "/GameHorizon/Explore",    icon: CiSearch },
      { label: "Bookmarks", path: "/GameHorizon/Bookmarks",  icon: FaRegBookmark},
      { label: "Inbox",     path: "/GameHorizon/Inbox",      icon: FaInbox },
    ];
  
  return (
        <div id="sm-gh-navigation" style={{ width: 120 }} 
            className="list-group rounded-0 position-fixed
            bottom-0 top-0 d-none d-md-block bg-black z-2">
            
            <a id="sm-gg-link" href="/GameHorizon/Homepage" 
                className="list-group-item bg-black border-0 text-center">
                <img src="/images/NEU.png" width="75px" />
            </a>

            <Link to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
                    ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
                <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
                <br />
                Account
            </Link>
            {links.map((link) => (
                <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
                    ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
                    {link.icon({ className: "fs-1 text-white"})}
                    <br />
                </Link>
            ))}

        </div>
    );
}
