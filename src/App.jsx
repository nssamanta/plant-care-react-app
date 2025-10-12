import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import About from './pages/About';
import AllPlants from './pages/AllPlants'
import Home from './pages/Home';
import NewPlantForm from './pages/NewPlantForm';
import NotFound from './pages/NotFound';
import PlantDetails from './pages/PlantDetails'
import Layout from './shared/Layout';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="plants" element={<AllPlants />} />
          <Route path="newplant" element={<NewPlantForm />} />
          <Route path="plants/:plantId" element={<PlantDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
