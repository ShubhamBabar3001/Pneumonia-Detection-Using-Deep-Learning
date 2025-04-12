import React, { useEffect, useState } from "react";
import './Mainnavbar.css';
// ------------------------------- Font Awesome -------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";

function Mainnavbar() {
    const [slidebar, setSlidebar] = useState(false);
    const [userName,setUserName] = useState("");

    const toggleSidebar = () => {
        setSlidebar(!slidebar);
    };

    useEffect(() => {
        const storedData = localStorage.getItem("userData");
    if (storedData) {
        const parsedData = JSON.parse(storedData); // Parse JSON string into an object
        setUserName(parsedData.name);
    }
    }, []);
    

    return (
        <div className="Navbar">
            <nav className="Navbar-Container">
                <div id="logo">
                    <p><span>Pneumina</span> Detection</p>
                </div>
                {slidebar ? (
                    <ul id="nav-items-side-bar">
                        <span id="cross"><FontAwesomeIcon icon={faXmark} onClick={toggleSidebar} className="menu-bar" /></span>
                        <li id="side-bar-profile"><FontAwesomeIcon icon={faUser} /></li>
                        <li className="menu-item"> <a href="/">Overview</a></li>
                        <li className="menu-item"> <a href="/registration">Health Record</a></li>
                        <li className="menu-item"> <a href="/registration2">Upload X-Ray</a></li>
                        <li className="menu-item"> <a href="/registration1">Information</a></li>
                        <button className="signInBtn">SignIn</button>
                        <button className="main-btn">Login</button>
                    </ul>
                ) : (

                    <div className="navLeftPart">
                        <p>{userName}</p>
                        <ul id="nav-items2">
                            <FontAwesomeIcon icon={faUser} />
                        </ul>
                    </div>
                )}

                <FontAwesomeIcon icon={faBars} className="menu-bar" onClick={toggleSidebar} />
            </nav>
        </div>
    );
};
export default Mainnavbar