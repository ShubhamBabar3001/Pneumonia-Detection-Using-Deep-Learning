import React from 'react';
import './OverviewDiv.css';

function OverviewDiv({total_case,last_chackup,total_check}) {
    return (
        <div id="overviewDiv">
            <h1>Patient Dashboard</h1>
            <div className="overviewcard-wrapper">
                <div className="overviewcard">
                    <h2>Total Check-ups</h2>
                    <p>{total_check}</p>
                </div>
                {/* <div className="overviewcard">
                    <h2>Last Check-up</h2>
                    <p>{last_chackup}</p>
                </div> */}
                <div className="overviewcard">
                    <h2>Pneumonia History</h2>
                    <p>{total_case} Case</p>
                </div>
                {/* <div className="overviewcard">
                    <h2>Next Appointment</h2>
                    <p>---</p>
                </div> */}
            </div>
        </div>
    );
};

export default OverviewDiv;
