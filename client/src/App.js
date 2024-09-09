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
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;