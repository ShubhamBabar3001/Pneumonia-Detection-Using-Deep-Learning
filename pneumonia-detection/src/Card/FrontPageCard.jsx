import React from 'react';
import './FrontPageCard.css';
function FrontPageCars({ title, description, benefits }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {benefits.map((benefit, index) => (
          <li key={index}>{benefit}</li>
        ))}
      </ul>
    </div>
  );
}

export default FrontPageCars;
