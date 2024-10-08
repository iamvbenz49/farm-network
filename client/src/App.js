import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './Pages/Homepage';
import Choose from './Components/Choose';
import WarHousePage from './Pages/WarHousePage';
import FarmerPage from './Pages/FarmerPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/warehouse" element={<WarHousePage />} />
        <Route path="/farmer" element={<FarmerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;