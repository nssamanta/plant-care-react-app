import PlantCard from '../shared/PlantCard';
import PlantsViewForm from '../features/PlantsViewForm';

function AllPlants({
  plants,
  isLoading,
  error,
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  return (
    <div>
      <PlantsViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />
      <h2>My Plant Collection</h2>
      {error && <p>Error: {error}</p>}

      {isLoading && <p>Loading plants...</p>}

      {!isLoading &&
        !error &&
        (plants.length === 0 ? (
          <p>No plants yet. Time to add your first one!</p>
        ) : (
          <div className="plantGrid">
            {plants.map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        ))}
    </div>
  );
}
export default AllPlants;
