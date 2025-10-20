import { useState } from 'react';
import { Link } from 'react-router-dom';
import NewPlantForm from '../features/NewPlantForm';
function Home({ onAddPlant }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Welcome to Your Plant Care Hub 🪴</h1>
      <p>Never forget to water your plants again.</p>
      <Link to="/plants">
        <button>View My Plants</button>
      </Link>
      <div>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add a New Plant'}
        </button>
        {showForm && <NewPlantForm onAddPlant={onAddPlant} />}
      </div>
    </div>
  );
}
export default Home;
