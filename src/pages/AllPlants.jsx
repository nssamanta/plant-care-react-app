import PlantCard from '../shared/PlantCard';

function AllPlants({ plants, isLoading, error }) {
  if (isLoading) {
    return <p>Loading plants...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>My Plant Collection</h2>
      {plants.length === 0 ? (
        <p>No plants yet. Time to add your first one!</p>
      ) : (
        <div className="plantGrid">
          {plants.map(plant => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
}
export default AllPlants;
