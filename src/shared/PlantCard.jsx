import React from 'react';

function PlantCard({ plant }) {
    const { name, wateringFrequency, lastWatered } = plant;

    return (
        <div className="plantCard">
            <h3>{name}</h3>
            <p>Water every: {wateringFrequency} days</p>
            <p>Last watered on {lastWatered}</p>
        </div>
    )
}

export default PlantCard;
