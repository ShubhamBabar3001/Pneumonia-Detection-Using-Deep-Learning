import React, {useState,useEffect } from "react";
import axios from "axios";

import './Patientpage.css';
import Verticlebar from "../Mainpage Component/Verticlebar";
import OverviewDiv from "../Mainpage Component/OverviewDiv";
import HealthRecordDiv from "../Mainpage Component/HealthRecordDiv.jsx";
import InformationDiv from "../Mainpage Component/Information.jsx";
import UploadImageDiv from "../Mainpage Component/UploadImage.jsx";
import Chatbot from "../Chatbot/Chatbot.jsx";
function Patientpage() {
    // const [selectedComponent, setSelectedComponent] = useState("overview");
    const [userData, setUserData] = useState(null); // State to store user data

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        // console.log("Stored User:", storedUser);

        if (storedUser && storedUser.id) {
            setUserData(storedUser); // Set initial user data

            // Function to fetch overview data
            const fetchOverviewData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/get_data`, {
                        params: {
                            id: storedUser.id,
                            page: "overview"
                        }
                    });

                    if (response.data.user) {
                        // Merge new overview data into userData and update state
                        const updatedUserData = { ...storedUser, ...response.data.user };
                        setUserData(updatedUserData);

                    } else {
                        console.error("Error fetching data:", response.data.error);
                    }
                } catch (error) {
                    console.error("Axios fetch error:", error);
                }
            };

            // Fetch data immediately
            fetchOverviewData();

            // Set interval to fetch data every 3 seconds
            const interval = setInterval(fetchOverviewData, 3000);

            // Cleanup function to clear interval when component unmounts
            return () => clearInterval(interval);
        }
    }, []); 
    

    const [selectedComponent, setSelectedComponent] = useState("Dashboard");

    // Function to render the selected component
    const renderComponent = () => {
        switch (selectedComponent) {
            case "Overview":
                return <OverviewDiv total_case={userData?userData.total_case:0} last_checkup={userData ? userData.last_check : "---"}
                total_check={userData?userData.total_check:0}/>;
            case "Health Record":
                return <HealthRecordDiv />;
            case "Information":
                return <InformationDiv />;
            case "Upload Image":
                return <UploadImageDiv />;
            default:
                return <OverviewDiv />;
        }
    };
    
   
    return (
        <div className="patientpage">
            <div id="patientpage1">
                <Verticlebar setSelectedComponent={setSelectedComponent} />
                {renderComponent()}
                <Chatbot/>
            </div>
            
        </div>
    );
};
export default Patientpage