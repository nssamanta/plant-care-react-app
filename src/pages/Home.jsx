import { useState } from 'react';
import { Link } from 'react-router-dom';
import NewPlantForm from '../features/NewPlantForm';
import styles from './Home.module.css';

function Home({ onAddPlant }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={styles.container}>
      <h1>Welcome to Your Plant Care Hub 🌱</h1>
      <p>Never forget to water your plants again. 💧</p>
      <div className={styles.actions}>
        <Link to="/plants">
          <button className="button button-primary">View My Plants</button>
        </Link>
        <div className="buttonContainer">
          <button
            className="button button-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add a New Plant'}
          </button>
          {showForm && <NewPlantForm onAddPlant={onAddPlant} />}
        </div>
      </div>
    </div>
  );
}
export default Home;
