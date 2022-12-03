import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoesForm from './ShoesForm';
import HatsList from './HatsList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/shoes" element={<ShoesList />} />
          <Route path="/shoes/new" element={<ShoesForm />} />
          <Route path="/hats" element={<HatsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
