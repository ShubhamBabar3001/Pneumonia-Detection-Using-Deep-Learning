import React from 'react';
import './Footer.css';
function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-title">PneumoDetect</h2>
                        <p className="footer-description">
                            AI-powered pneumonia detection system for faster and more accurate diagnoses.
                        </p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-set">
                            <div className="footer-column">
                                <h3>Solutions</h3>
                                <ul>
                                    <li>For Doctors</li>
                                    <li>For Patients</li>
                                    <li>For Hospitals</li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3>Support</h3>
                                <ul>
                                    <li>Pricing</li>
                                    <li>Documentation</li>
                                    <li>Guides</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-set">
                            <div className="footer-column">
                                <h3>Company</h3>
                                <ul>
                                    <li>About</li>
                                    <li>Blog</li>
                                    <li>Careers</li>
                                </ul>
                            </div>
                            <div className="footer-column">
                                <h3>Legal</h3>
                                <ul>
                                    <li>Privacy</li>
                                    <li>Terms</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} PneumoDetect, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;