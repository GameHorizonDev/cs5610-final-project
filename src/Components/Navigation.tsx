import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

export default function Navigation() {
    const { pathname } = useLocation();

    const links = [
        { label: "Home", path: "/home", icon: AiOutlineHome },
        { label: "Login", path: "/login", icon: FaSignInAlt },
        { label: "Register", path: "/register", icon: FaUserPlus },
        { label: "Profile", path: "/profile", icon: FaUserCircle },
        { label: "Game Reviews", path: "/view-game/default", icon: MdRateReview },
    ];

    return (
        <div
            id="main-navigation"
            style={{
                width: 120,
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                overflowY: "auto",
                backgroundColor: "#212529",
            }}
            className="list-group rounded-0"
        >
            <a
                id="brand-link"
                href="/"
                className="list-group-item bg-dark border-0 text-center"
                style={{ padding: "0" }}
            >
                <img
                    src="/images/Game.png"
                    alt="Brand Logo"
                    style={{
                        width: "140px",
                        height: "140px",
                        objectFit: "contain",
                        margin: "0 auto",
                    }}
                />
            </a>
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`list-group-item bg-dark text-center border-0 ${pathname === link.path ? "text-danger bg-white" : "text-white"
                        }`}
                    style={{ padding: "20px 0", textDecoration: "none", }}
                >
                    {link.icon({
                        className: `fs-1 ${pathname === link.path ? "text-danger" : "text-white"
                            }`,
                    })}
                    <br />
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
