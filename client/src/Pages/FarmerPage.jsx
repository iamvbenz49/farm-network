import React from "react";
import Navbar from "../Components/NavBar";
import Choose from "./Choose";
import CropManagement from "./CropManagement";
function FarmerPage(){
    return (
    <>
    <div>
      <Navbar />
      <div className="ml-[250px]">
        <CropManagement></CropManagement>
      </div>
    </div>
    </>
    );

}
export default FarmerPage;