import React from "react";
import './Firstpage.css';
import FrontPageCads from "../Card/FrontPageCard";

function Firstpage() {
    return (
        <div className="Firstpage">
            <div id="Firstpage1">
                <p className="tname">Welcome to the pneumoDetect</p>
                <p className="tdinfo">Our Al-powered system uses chest X-rays to accurately detect pneumonia, helping doctors make faster and more accurate diagnoses. </p>
                <div className="btnDiv">
                    <button className="signInBtn">SignIn</button>
                    <button className="main-btn">Login</button>
                </div>
            </div>
            <div id="Firstpage2">
                    <FrontPageCads
                        title="For Doctors"
                        description="Enhance your diagnostic capabilities with our state-of-the-art AI assistance. Our platform helps you make faster and more accurate pneumonia diagnoses."
                        benefits={[
                          'AI-powered image analysis',
                          'Streamlined workflow',
                          'Comprehensive patient management',
                        ]}
                    />
                    <FrontPageCads
                        title="For Patients"
                        description="Get quick and accurate pneumonia diagnoses from the comfort of your home. Our AI-powered system analyzes your chest X-rays and provides results within minutes."
                        benefits={[
                          'Fast and reliable results',
                          'Convenient online access',
                          'Secure and confidential',
                        ]}
                    />
            </div>
            
        </div>
    );
};
export default Firstpage