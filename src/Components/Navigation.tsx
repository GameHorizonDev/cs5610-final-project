import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaSignInAlt, FaUserPlus, FaUserCircle, FaInfoCircle } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { getCurrUserId } from "../API/user";
import { useState, useEffect } from "react";

export default function Navigation() {
    const { pathname } = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const setLoginStatus = async () => {
            const userId = await getCurrUserId();
            console.log(userId);
            if (userId) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        setLoginStatus();
    }, [pathname])

    const guestLinks = [
        { label: "Login", path: "/login", icon: FaSignInAlt },
        { label: "Register", path: "/register", icon: FaUserPlus },
    ];

    const authLinks = [
        { label: "Profile", path: "/profile", icon: FaUserCircle },
    ];

    const commonLinks = [
        { label: "Home", path: "/home", icon: AiOutlineHome },
        { label: "Game Reviews", path: "/view-game/default", icon: MdRateReview },
    ];

    const endingLinks = [
        { label: "Landing Page", path: "/landing", icon: FaInfoCircle }
    ]

    let links = isLoggedIn ? [...commonLinks, ...authLinks] : [...commonLinks, ...guestLinks];
    links = [...links, ...endingLinks]

    return (
        <div
            id="main-navigation"
            style={{
                width: 120,
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
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
                    style={{
                        padding: "20px 0",
                        textDecoration: "none",
                    }}
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
