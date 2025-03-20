import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Alimentation from './pages/Alimentation';
import Service from './pages/Service';
import Fabrication from './pages/Fabrication';
import Batiment from './pages/Batiment';
import Error from './_utils/Error';
import Layout from './components/Layout';
import PagesConstruction from './components/PagesConstruction';
import ArtisanPage from './pages/ArtisanPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="alimentation" element={<Alimentation />} />
          <Route path="batiment" element={<Batiment />} />
          <Route path="fabrication" element={<Fabrication />} />
          <Route path="services" element={<Service />} />
          <Route path="/pagesconstruction" element={<PagesConstruction />} />
          <Route path="/artisan/:id" element={<ArtisanPage />} />



          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;