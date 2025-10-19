import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import AllPlants from './pages/AllPlants';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import PlantDetails from './pages/PlantDetails';
import Layout from './shared/Layout';

function App() {
  console.log('Using Token:', import.meta.env.VITE_PAT);
  console.log(
    'Using URL:',
    `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`
  );
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const commonHeaders = {
    Authorization: token,
    'Content-Type': 'application/json',
  };

  const createFetchOptions = (method, payload = null) => ({
    method,
    headers: commonHeaders,
    ...(payload && { body: JSON.stringify(payload) }),
  });

  const createPlantPayload = (plant, includeId = false) => ({
    records: [
      {
        ...(includeId && { id: plant.id }),
        fields: {
          name: plant.name,
          wateringFrequency: plant.wateringFrequency,
          lastWatered: plant.lastWatered,
          notes: plant.notes,
        },
      },
    ],
  });

  const transformAirtableRecord = record => {
    const plant = {
      id: record.id,
      ...record.fields,
    };
    return plant;
  };

  const handleApiError = async response => {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message ||
          `Request failed with status ${response.status}`
      );
    }
    return response;
  };

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      const options = createFetchOptions('GET');
      try {
        const resp = await fetch(url, options);
        await handleApiError(resp);
        const { records } = await resp.json();
        const transformedPlants = records.map(transformAirtableRecord);
        setPlants(transformedPlants);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchPlants();
  }, []);

  const addPlant = async newPlantData => {
    const payload = createPlantPayload(newPlantData);
    const options = createFetchOptions('POST', payload);
    try {
      const resp = await fetch(url, options);
      await handleApiError(resp);
      const { records } = await resp.json();
      const newPlant = transformAirtableRecord(records[0]);

      setPlants(prevPlants => [newPlant, ...prevPlants]);
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const deletePlant = async plantId => {
    const deleteUrl = `${url}/${plantId}`;
    const options = createFetchOptions('DELETE');

    try {
      const resp = await fetch(deleteUrl, options);
      await handleApiError(resp);
      setPlants(prevPlants => prevPlants.filter(plant => plant.id !== plantId));
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const updatePlant = async (plantId, updateFields) => {
    const payload = {
      records: [
        {
          id: plantId,
          fields: updateFields,
        },
      ],
    };
    const options = createFetchOptions('PATCH', payload);
    try {
      const resp = await fetch(url, options);
      await handleApiError(resp);
      const { records } = await resp.json();
      const updatedPlant = transformAirtableRecord(records[0]);

      setPlants(prevPlants =>
        prevPlants.map(plant =>
          plant.id === updatedPlant.id ? updatedPlant : plant
        )
      );
      return updatedPlant;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home onAddPlant={addPlant} />} />
          <Route
            path="plants"
            element={
              <AllPlants plants={plants} isLoading={isLoading} error={error} />
            }
          />
          <Route
            path="plants/:plantId"
            element={
              <PlantDetails
                onDeletePlant={deletePlant}
                onUpdatePlant={updatePlant}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
