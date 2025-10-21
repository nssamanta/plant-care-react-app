import { Link } from 'react-router-dom';
import styles from './PlantCard.module.css';

function PlantCard({ plant }) {
  const { id, name, wateringFrequency, lastWatered } = plant;

  return (
    <Link to={`/plants/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <h3>{name}</h3>
        <p>Water every: {wateringFrequency} days</p>
        <p>Last watered on {lastWatered}</p>
      </div>
    </Link>
  );
}

export default PlantCard;
