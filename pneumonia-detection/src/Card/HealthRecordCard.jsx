import React from 'react';
import './HealthRecordCard.css';

function HealthRecordCard({name,date,time}){
    return(
        <div className="HealthRecordCard">
            <div className="HealthCardPart">
                <p>{name}</p>
            </div>
            <div className="HealthCardPart">
                <p>{date}</p>
            </div>
            <div className="HealthCardPart">
                <p>{time}</p>
            </div>
        </div>
    );
};
export default HealthRecordCard