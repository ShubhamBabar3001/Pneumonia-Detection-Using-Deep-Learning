import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './UploadImage.css';

function UploadImageDiv() {
    const [image, setImage] = useState(null);
    const [prediction, setPrediction] = useState("");
    const fileInputRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [userId, setUserId] = useState(null);
    const [futureTreatment, setTreatment] = useState([]);


    // ================================= Treatment =====================================
    useEffect(() => {
        if (prediction === "Pneumonia-Viral") {
            setTreatment([
                "Rest and hydration.",
                "Oxygen therapy if needed.",
                "Antiviral medications (if applicable).",
                "Monitor for complications."
            ]);
        } else if (prediction === "Pneumonia-Bacterial") {
            setTreatment([
                "Take prescribed antibiotics.",
                "Hospitalization if symptoms are severe.",
                "Oxygen therapy if breathing difficulty occurs.",
                "Supportive care and monitoring."
            ]);
        } else if (prediction === "COVID-19") {
            setTreatment([
                "Take antiviral drugs (e.g., Remdesivir).",
                "Use corticosteroids (e.g., Dexamethasone).",
                "Oxygen therapy for severe cases.",
                "Ventilation support if needed."
            ]);
        }
        else if (prediction === "Normal") {
            setTreatment([
                "Your Health is well done."
            ]);
        }
         else {
            setTreatment([ 
            ]);
        }
    }, [prediction]);



    //------------------------- Retrieve user ID from route state --------------------
    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
        } else {
            // Fallback: Retrieve user ID from localStorage
            const userData = JSON.parse(localStorage.getItem("userData"));
            if (userData && userData.id) {
                setUserId(userData.id);
            }
        }
    }, [location]);

    //-------------------------- Handle File Change Function ---// Correct----------------------
    const handleFileChange = (event) => {
        setPrediction("");
        try {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImage(e.target.result);
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            console.error("Error handling file change: ", error);
        }
    };

    // ---------------------------------- Handle Prediction Function ---------------------------
    const handlePrediction = async () => {
        if (!fileInputRef.current || !fileInputRef.current.files[0]) {
            alert("Please upload an image first.");
            return;
        }

        const file = fileInputRef.current.files[0];

        setIsLoading(true); // Start loading only after confirming an image is present.

        try {
            const formData = new FormData();
            formData.append("file", file); // Get the actual file
            formData.append("user_id", userId);

            const response = await axios.post("http://localhost:5000/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data?.prediction) {
                setPrediction(response.data.prediction);
            } else {
                alert("No prediction received from the server.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image.");
        }
    };
    // -------------------------- Clear image btn -------------------------
    const handleClear = () => {
        try {
            setImage(null);
            setPrediction("");
            setIsLoading(false);
            setTreatment([]);
        } catch (error) {
            console.error("Error clearing the image: ", error);
        }
    };

    return (
        <div className="UploadImage">
            <div id="predictionArea">
                <div id="imageDiv">
                    <div id="InnerImageDiv" onClick={() => fileInputRef.current?.click()}>
                        <input
                            type="file"
                            ref={fileInputRef}  // Attach ref to the file input
                            accept="image/*"
                            hidden
                            onChange={handleFileChange}
                        />
                        {image ? (
                            <img src={image} alt="Selected" />
                        ) : (
                            <span className="placeholder">Click to upload</span>
                        )}
                    </div>
                </div>
                <div id="predictionBtn">
                    <button id="predictButton" className="main-btn" onClick={handlePrediction}>Predict</button>
                    <button id="clear" className="main-btn" onClick={handleClear} >Clear</button>
                </div>


            </div>
            <div id="Doctorlist">
                <div id="result-prediction">
                    {!isLoading ? (
                        <div className="lds-ripple"><div></div><div></div></div>
                    ) : (
                        <p>{prediction}</p>
                    )}
                    <div className="FutureTreatment">
                        <p className="placeholder">Future Treatment</p>
                        <ul>
                            {futureTreatment.map((treatment, index) => (
                                <li key={index}>{treatment}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};
export default UploadImageDiv