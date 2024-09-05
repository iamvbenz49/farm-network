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
        <Route path="/farmer" element={<FarmerPage />} />
        <Route path="/need" element={<HomePage />} />
        <Route path="/warehouse" element={<WarHousePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
