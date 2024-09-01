import React from "react";
import Navbar from "../Components/NavBar";
import Choose from "./Choose";
function HomePage(){
    return (
    <>
    <div>
      <Navbar />
      <div className="ml-[250px]">
        <Choose />
      </div>
    </div>
    </>
    );

}
export default HomePage;