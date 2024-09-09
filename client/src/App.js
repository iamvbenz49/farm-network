import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from './Pages/Homepage';
import Choose from './Components/Choose';
import WarHousePage from './Pages/WarHousePage';
import FarmerPage from './Pages/FarmerPage';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/farmer" element={<FarmerPage />} />
        <Route path="/need" element={<HomePage />} />
        <Route path="/warehouse" element={<WarHousePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
=======
    <>
     <FarmerPage/>
     {/* <LoginPage/> */}
    </>
>>>>>>> 66a81528cf883f25da286cba55e9d62fff7ea67e
  );
}

export default App;