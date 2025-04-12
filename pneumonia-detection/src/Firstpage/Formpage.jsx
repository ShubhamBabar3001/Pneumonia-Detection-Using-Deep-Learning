import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Formpage.css';

import patientImg from '../Asset/patient.jpg';
import doctorImg from '../Asset/DoctorImg.jpg';
import Formswitch from '../Asset/Switch/Formswitch.jsx';

function Formpage() {
    const [user, setUser] = useState(false); // false = Patient, true = Doctor
    const [login, setLogin] = useState(true); // true = Login, false = SignUp
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const navigate = useNavigate();

    // Toggle between Patient & Doctor
    function userChange() {
        setUser(!user);
    }

    // Toggle between Login & SignUp
    function formChange() {
        setLogin(!login);
    }

    // ---------------------------------- Login Function ---------------------------
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/login", { email, password });
            console.log("form page");
            console.log(response);

            if (response.status === 200) {
                const user = response.data.user;                            // Extract user data
                console.log("User Data:", user);                            // Debugging: Print extracted user data

                if (user) {
                    localStorage.setItem("userData", JSON.stringify(user));  // Store user data in localStorage

                    navigate("/patientpage", { state: { userId: user.id } }); // Navigate to UploadImage page and pass user ID
                } else {
                    console.error("User data is missing in response");
                }
            }
        } catch (error) {
            alert("User Not Present or Incorrect Credentials");
        }
    };

    // ------------------------------------- Signup Function -----------------------------
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/signup", {
                name, email, password, userType: user ? "doctor" : "patient"
            });
            console.log(response);
            if (response.status === 201) {
                alert("Signup Successful! Please Login.");
                setLogin(true); // Switch to Login Form
            }
        } catch (error) {
            alert("Error during Signup. Please try again.");
        }
    };

    return (
        <div id="Formpage1">
            <div id="Formpage2">
                <div id="FormDiv">
                    {user === false ? <img src={patientImg} alt="Patient" /> : <img src={doctorImg} alt="Doctor" />}

                    {/* Patient Login Form */}
                    {user === false && login === true ? (
                        <form onSubmit={handleLogin}>
                            <p id="person">Patient Login</p>
                            <p className="label">Email:</p>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <p className="label">Password:</p>
                            <div className="passwordContainer">
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button id="loginbtn" type="submit" className="Form-btn">Login</button>
                            <p>Don't have an account? <span id="swapForm" onClick={formChange}>Sign Up</span></p>
                        </form>
                    ) : user === false && login === false ? (
                        
                        // Patient Signup Form
                        <form onSubmit={handleSignup}>
                            <p id="person">Patient SignUp</p>
                            <p className="label">Name:</p>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <p className="label">Email:</p>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <p className="label">Password:</p>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <p className="label">Confirm Password:</p>
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <button id="signupbtn" type="submit" className="Form-btn">Sign Up</button>
                            <p>Already have an account? <span id="swapForm" onClick={formChange}>Login</span></p>
                        </form>
                    ) : user === true && login === true ? (
                        // Doctor Login Form
                        <form onSubmit={handleLogin}>
                            <p id="person">Doctor Login</p>
                            <p className="label">Email:</p>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <p className="label">Password:</p>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button id="loginbtn" type="submit" className="Form-btn">Login</button>
                            <p>Don't have an account? <span id="swapForm" onClick={formChange}>Sign Up</span></p>
                        </form>
                    ) : (
                        // Doctor Signup Form
                        <form onSubmit={handleSignup}>
                            <p id="person">Doctor SignUp</p>
                            <p className="label">Name:</p>
                            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <p className="label">Email:</p>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <p className="label">Password:</p>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <p className="label">Confirm Password:</p>
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <button id="signupbtn" type="submit" className="Form-btn">Sign Up</button>
                            <p>Already have an account? <span id="swapForm" onClick={formChange}>Login</span></p>
                        </form>
                    )}

                    {/* Toggle Switch for Patient/Doctor */}
                    <div className="switchdiv">
                        <Formswitch onClick={userChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Formpage;
