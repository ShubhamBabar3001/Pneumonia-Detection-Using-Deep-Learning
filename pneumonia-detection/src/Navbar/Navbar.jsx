import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';
// ------------------------------- Font Awesome -------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";



function Navbar() {
    const [slidebar, setSlidebar] = useState(false);
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
        setSlidebar(false); // Close sidebar after navigation
    };

    const toggleSidebar = () => {
        setSlidebar(!slidebar);
    };

    return (
        <div className="Navbar">
            <nav className="Navbar-Container">
                <div id="logo">
                    <p><span>Pneumina</span> Detection</p>
                </div>
                {slidebar ? (
                    <ul id="nav-items-side-bar">
                        <span id="cross" onClick={toggleSidebar}><FontAwesomeIcon icon={faXmark} onClick={toggleSidebar} className="menu-bar" /></span>
                        <li className="menu-item"> <a href="/">Home</a></li>
                        <li className="menu-item"> <a href="/registration">About</a></li>
                        <li className="menu-item"> <a href="/registration">Contact</a></li>
                        <button className="signInBtn" onClick={() => handleNavigation('/form')}>SignUp</button>
                        <button className="main-btn" onClick={() => handleNavigation('/form')}>Login</button>
                    </ul>
                ) : (
                    <ul id="nav-items">
                        <li className="menu-item"> <a href="/">Home</a></li>
                        <li className="menu-item"> <a href="/registration">About</a></li>
                        <li className="menu-item"> <a href="/registration">Contact</a></li>
                        <button className="signInBtn" onClick={() => handleNavigation('/form')}>SignUp</button>
                        <button className="main-btn" onClick={() => handleNavigation('/form')}>LogIn</button>
                    </ul>
                )}

                <FontAwesomeIcon icon={faBars} className="menu-bar" onClick={toggleSidebar} />
            </nav>
        </div>
    );
};
export default Navbar