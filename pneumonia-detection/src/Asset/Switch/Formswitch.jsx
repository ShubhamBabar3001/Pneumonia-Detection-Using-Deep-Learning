import React, { useState } from "react";
import './Formswitch.css';

function Formswitch({ onClick }) { // Accept onClick as a prop
    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = () => {
        setIsOn(prevState => !prevState);

        if (onClick) {  // Call the onClick prop if provided
            onClick();
        }
    };

    return (
        <div id="outerpart" onClick={toggleSwitch}>
            <p>D</p>
            <div id="innerpart" className={isOn ? "active" : ""}></div>
            <p>P</p>
        </div>
    );
};

export default Formswitch;
