import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavBar";
import Choose from "../Components/Choose";
import CropManagement from "../Components/CropManagement";
import axios from "axios";
function FarmerPage(){
  const [farmer, setFarmer] = useState({});
  const [need, setNeed] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/farmer");
        // Store the data in state
        setFarmer(res.data.farmer);
        setNeed(res.data.need);
        console.log(res.data.farmer)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <div>
      <Navbar />
      <div className="ml-[250px]">
        <CropManagement props = {need}/>
      </div>
    </div>
    </>
    );

}
export default FarmerPage;