import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPlantForm({ onAddPlant }) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState('');
  const [lastWatered, setLastWatered] = useState('');
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSaving(true);


    const newPlant = {
      name: name,
      wateringFrequency: parseInt(wateringFrequency, 10),
      lastWatered: lastWatered,
      notes: notes,
    };

    try {
      await onAddPlant(newPlant);
      navigate('/plants');
    } catch (error) {
      console.error('Failed to add plant:', error);
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Plant Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="wateringFrequency">Water every (days)</label>
          <input
            id="wateringFrequency"
            type="number"
            value={wateringFrequency}
            onChange={e => setWateringFrequency(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lastWatered">Last Watered Date</label>
          <input
            id="lastWatered"
            type="date" 
            value={lastWatered}
            onChange={e => setLastWatered(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" disabled={name.trim() === '' || isSaving}>
          {isSaving ? 'Saving...' : 'Add Plant'}
        </button>
      </form>
    </div>
  );
}
export default NewPlantForm;
