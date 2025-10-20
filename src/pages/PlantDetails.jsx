import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


function getWateringStatus(lastWatered, frequency) {
  if (!lastWatered || !frequency) {
    return 'Unknown';
  }

  const today = new Date();
  const lastWateredDate = new Date(lastWatered);

  const nextWateringDate = new Date(
    lastWateredDate.setDate(lastWateredDate.getDate() + frequency)
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.round((nextWateringDate - today) / msPerDay);

  if (daysDifference > 1) {
    return `Water in ${daysDifference} days`;
  } else if (daysDifference === 1) {
    return 'Water tommorow';
  } else if (daysDifference === 0) {
    return 'Water Today! 💧';
  } else {
    return `Overdue by ${Math.abs(daysDifference)} days ! 🚨`;
  }
}

function PlantDetails({
  onDeletePlant,
  onUpdatePlant,

}) {
  const { plantId } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');

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
        if (!response.ok) {
          throw new Error(
            `Failed to fetch plant with status ${response.status}`
          );
        }
        const data = await response.json();
        const transformAirtableRecord = record => ({
          id: record.id,
          ...record.fields,
        });
        setPlant(transformAirtableRecord(data));
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchSinglePlant();
  }, [plantId]);

  const handleEditClick = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const handleCancel = () => {
    setEditingField(null);
    setEditValue('');
  };

  const handleUpdate = async () => {
    const updatedFields = {
      [editingField]: editValue,
    };

    if (editingField === 'wateringFrequency') {
      updatedFields[editingField] = parseInt(editValue, 10);
    }

    try {
      const updatedPlant = await onUpdatePlant(plantId, updatedFields);
      setPlant(updatedPlant);
      handleCancel();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  const handleWatering = async () => {
    const today = new Date();

    const todayString = today.toISOString().slice(0, 10);

    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const token = `Bearer ${import.meta.env.VITE_PAT}`;

    const payload = {
      records: [
        {
          id: plantId,
          fields: {
            lastWatered: todayString,
          },
        },
      ],
    };

    const options = {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to update plant in Airtable.');
      }
      setPlant(prevPlant => ({
        ...prevPlant,
        lastWatered: todayString,
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await onDeletePlant(plantId);
      navigate('/plants');
    } catch (error) {
      console.error('Failed to delete plant:', error);
    }
  };

  if (isLoading) {
    return <p>Loading plant details...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!plant) {
    return <p>Plant not found.</p>;
  }

  const status = getWateringStatus(plant.lastWatered, plant.wateringFrequency);

  return (
    <div>
    
      <h2>
        {editingField === 'name' ? (
          <div>
            <input
              type="text"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <span onClick={() => handleEditClick('name', plant.name)}>
            {plant.name}
          </span>
        )}
      </h2>
      <p>
        <strong>Watering Frequency:</strong>
        {editingField === 'wateringFrequency' ? (
          <div>
            <input
              type="number"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <span
            onClick={() =>
              handleEditClick('wateringFrequency', plant.wateringFrequency)
            }
          >
            Water every {plant.wateringFrequency} days.
          </span>
        )}
      </p>
      <p>
        <strong>Last Watered On:</strong>
        {editingField === 'lastWatered' ? (
          <div>
            <input
              type="date"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <span
            onClick={() => handleEditClick('lastWatered', plant.lastWatered)}
          >
            {plant.lastWatered}
          </span>
        )}
      </p>
      <p>
        <strong>Notes:</strong>
      </p>
      {editingField === 'notes' ? (
        <div>
          <textarea
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <p onClick={() => handleEditClick('notes', plant.notes)}>
          {plant.notes || 'No notes for this plant.'}
        </p>
      )}
      <p>{status}</p>
      <button onClick={handleWatering}>I Watered This Plant! 💧</button>
      <button onClick={handleDelete}>Delete Plant</button>
    </div>
  );
}

export default PlantDetails;
