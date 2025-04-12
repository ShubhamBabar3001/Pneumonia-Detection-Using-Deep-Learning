import React from 'react';
import './Information.css';

function InformationDiv() {
    return (
        <div className="InfromatioDiv">
            <div id="info">
                <h2>Bacterial Pneumonia</h2>
                <p>Bacterial pneumonia is a lung infection caused by bacteria, leading to inflammation in the alveoli (air sacs) that fill with pus or fluid. The most common cause is Streptococcus pneumoniae, though other bacteria like
                    Haemophilus influenzae and Staphylococcus aureus can also be responsible.</p>
                <h4>Symptoms:</h4>
                <ul>
                    <li>High fever with chills</li>
                    <li>Cough producing thick yellow, green, or bloody mucus</li>
                    <li>Chest pain that worsens with breathing or coughing</li>
                    <li>Shortness of breath</li>
                    <li>Fatigue and muscle aches</li>
                    <li>Rapid heartbeat</li>
                </ul>
                <h4>Causes and Risk Factors:</h4>
                <ul>
                    <li>Bacteria entering the lungs through inhalation or bloodstream</li>
                    <li>Weakened immune system due to illness or age</li>
                    <li>Smoking and chronic lung diseases like COPD</li>
                    <li>Hospital-acquired infections</li>
                </ul>
            </div>
            <div id="info">
                <h2>Viral Pneumonia</h2>
                <p>Viral pneumonia is caused by viral infections, including Influenza, Respiratory Syncytial Virus (RSV), and Adenovirus. Unlike bacterial pneumonia, it cannot be treated with antibiotics.
                    The infection causes lung inflammation, leading to difficulty in oxygen exchange.</p>
                <h4>Symptoms:</h4>
                <ul>
                    <li>Fever with chills</li>
                    <li>Dry cough that may worsen over time</li>
                    <li>Fatigue and body aches</li>
                    <li>Shortness of breath</li>
                    <li>Sore throat and headache</li>
                    <li>Wheezing in severe cases</li>
                </ul>
                <h4>Causes and Risk Factors:</h4>
                <ul>
                    <li>Direct infection from airborne viral particles</li>
                    <li>Weakened immune system (infants, elderly, chronic illness)</li>
                    <li>Seasonal outbreaks, especially flu season</li>
                </ul>
            </div>
            <div id="info">
                <h2>COVID-19</h2>
                <p>COVID-19 is a respiratory illness caused by the SARS-CoV-2 virus, which was first identified in December 2019 in Wuhan, China. It rapidly spread globally, leading to the COVID-19 pandemic.
                    Below is a summary of the symptoms and causes of COVID-19.</p>
                <h4>Symptoms:</h4>
                <ul>
                    <li>Fever or chills</li>
                    <li>Cough</li>
                    <li>Shortness of breath or difficulty breathing</li>
                    <li>Fatigue</li>
                    <li>Muscle or body aches</li>
                    <li>Headache</li>
                </ul>
                <h4>Causes and Risk Factors:</h4>
                <ul>
                    <li>COVID-19 spreads mainly through respiratory droplets when an infected person coughs, sneezes, or talks.</li>
                    <li>It can also spread by touching contaminated surfaces and then touching the face, or through airborne particles in poorly ventilated spaces.</li>
                    <li>Asymptomatic individuals can unknowingly spread the virus.</li>
                </ul>
            </div>
        </div>
    );
};
export default InformationDiv