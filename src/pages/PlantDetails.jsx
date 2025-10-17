import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PlantDetails() {
  const { plantId } = useParams();

  const [plant, setPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSinglePlant = async () => {
      setIsLoading(true);
      setError(null);

      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${plantId}`;
      const token = `Bearer ${import.meta.env.VITE_PAT}`;

      const options = {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await fetch(url, options);
        if(!response.ok) {
            throw new Error(`Failed to fetch plant with status ${response.status}`);
        }
        const data = await response.json();
        const transformAirtableRecord = (record) => ({
            id: record.id, 
            ...record.fields,
        })
        setPlant(transformAirtableRecord(data));
        } catch(e) {
            setError(e.message);
        }
        setIsLoading(false);
      };
      fetchSinglePlant();
    }, [plantId]);

    if(isLoading) {
        return <p>Loading plant details...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    return (
      <div>
        <h2>{plant?.name}</h2>
        <p>
          <strong>Watering Frequency:</strong>Water every{' '}
          {plant?.wateringFrequency} days.
        </p>
        <p>
          <strong>Last Watered On:</strong> {plant?.lastWatered}
        </p>
        <p>
          <strong>Notes:</strong>
        </p>
        <p>{plant?.notes || 'No notes for this plant.'}</p>
      </div>
    );
}

export default PlantDetails;
