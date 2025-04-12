import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HealthRecordDiv.css';
import HealthCard from '../Card/HealthRecordCard';
function HealthRecordDiv() {
    const [healthRecords, setHealthRecords] = useState([]);


    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("userData"));
        // console.log("Stored User:", storedUser);

        if (storedUser && storedUser.id) {
            // Set initial health records if available
            setHealthRecords(storedUser.healthRecords || []);

            // Function to fetch data
            const fetchOverviewData = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/get_data`, {
                        params: {
                            id: storedUser.id,
                            page: "healthRecord"
                        }
                    });
                    // console.log(response);
                    if (response.data.user) {
                        // Update health records
                        setHealthRecords(response.data.user);
                        console.log(response.data.user);
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

    return (
        <div className="HealthRecordDiv">
            <div className="healthRecordTitle">
                <p>Pneumonia Name</p>
                <p>Checked date</p>
                <p>Checked Time</p>
            </div>
            <div id="HealthRecordContainer">
                {healthRecords.map((record, index) => (
                    <HealthCard key={index} name={record.pneumonia_name} date={record.checked_date} time={record.checked_time} />
                ))}
            </div>
        </div>
    );
};
export default HealthRecordDiv