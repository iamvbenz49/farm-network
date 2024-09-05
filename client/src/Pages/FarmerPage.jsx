import React from "react";
import Navbar from "../Components/NavBar";
import Choose from "../Components/Choose";
import CropManagement from "../Components/CropManagement";
function FarmerPage(){

  return (
    <>
    <div>
      <Navbar />
      <div className="ml-[250px]">
        <CropManagement />
      </div>
    </div>
    </>
    );

}
export default FarmerPage;