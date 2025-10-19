import { Link } from 'react-router-dom';

function PlantCard({ plant }) {
  const { id, name, wateringFrequency, lastWatered } = plant;

  return (
    <Link to={`/plants/${id}`} className="plantCardLink">
      <div className="plantCard">
        <h3>{name}</h3>
        <p>Water every: {wateringFrequency} days</p>
        <p>Last watered on {lastWatered}</p>
      </div>
    </Link>
  );
}

export default PlantCard;
