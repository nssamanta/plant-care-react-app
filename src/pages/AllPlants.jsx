function AllPlants({title}) {
  const plants = [
    { id: 1, title: 'Aloe', lastWatered: '2025-10-10' },
    { id: 2, title: 'String of Pearls', lastWatered: '2025-10-10' },
    { id: 3, title: 'Cactus', lastWatered: '2025-10-10' },
  ];
  return (
    <>
      <ul>
        <h2>{title}</h2>
        {plants.map(plant => (
          <li key={plant.id}>{plant.title}</li>
        ))}
      </ul>
    </>
  );
}
export default AllPlants;
