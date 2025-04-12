import React,{useState} from "react";
import './Verticlebar.css';
// import Verticlebarcard from "./Verticlebarcard";


function Verticlebar({ setSelectedComponent }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        {label: 'Overview' },
        {label: 'Health Record' },
        {label: 'Upload Image' },
        {label: 'Information' }
    ];
   
    return (
        <div className="verticalbar">
            {/* <p className="pointname">Dashboard</p> */}
            <ul>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={activeIndex === index ? "active" : ""}
                        onClick={() => {
                            setActiveIndex(index);
                            setSelectedComponent(item.label);
                        }}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Verticlebar;
