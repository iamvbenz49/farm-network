import React from "react";
import Description from "./Description.jsx";

const Table = () => {
  // Dummy data for the table
  const farmers = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Samuel Green" },
    { name: "Alice Johnson" },  // Added more entries for demonstration
    { name: "Bob Brown" },
    { name: "Carol White" },
  ];

  return (
    <div className="p-8">
      <div className="max-h-[300px] overflow-y-auto">
        <Description
          name={"Orange"}
          quantity={250}
          MSP={301}
          totalMSP={21}
          farmers={farmers}
        />
        <Description
          name={"Apple"}
          quantity={350}
          MSP={311}
          totalMSP={81}
          farmers={farmers}
        />
        <Description
          name={"Orange"}
          quantity={250}
          MSP={301}
          totalMSP={21}
          farmers={farmers}
        />
      </div>
    </div>
  );
}

export default Table;
