import { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import AllPlants from './pages/AllPlants';
import Home from './pages/Home';
import NewPlantForm from './pages/NewPlantForm';
import NotFound from './pages/NotFound';
import PlantDetails from './pages/PlantDetails';
import Layout from './shared/Layout';

function App() {
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  //common headers
  const commonHeaders = {
    Authorization: token,
    'Content-Type': 'application/json',
  };
  //common fetch options pattern
  const createFetchOptions = (method, payload = null) => ({
    method,
    headers: commonHeaders,
    ...(payload && { body: JSON.stringify(payload) }),
  });
  //payload builder function
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
  //Todo transformer function
  const transformAirtableRecord = record => {
    const plant = {
      id: record.id,
      ...record.fields,
    };
    return plant;
  };
  //error handling helper
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
      const options = createFetchOptions('GET'); //tells fetch this is a GET request with authentication
      try {
        const resp = await fetch(url, options); //makes api call and waits for response
        await handleApiError(resp);
        const { records } = await resp.json();
        const transformedPlants = records.map(transformAirtableRecord);
        setPlants(transformedPlants);
      } catch (error) {
        setError(e.message);
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
      // Add the new plant to our existing state
      setPlants(prevPlants => [newPlant, ...prevPlants]);
    } catch (e) {
      setError(e.message);
      throw e; // Re-throw error to handle it in the form
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="plants" element={<AllPlants plants={plants} isLoading={isLoading} error={error}/>} />
          <Route path="plants/new" element={<NewPlantForm onAddPlant={addPlant} />} />
          <Route path="plants/:plantId" element={<PlantDetails />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
