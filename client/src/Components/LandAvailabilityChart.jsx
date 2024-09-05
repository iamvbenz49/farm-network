import React from 'react';

// Utility function to generate grid cells
const generateGrid = (data, columns = 50, rows = 10) => {
  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  // Generate array of all days within the range
  const allDays = Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date.toDateString();
  });

  // Map data to a date availability
  const availabilityMap = data.reduce((acc, curr) => {
    acc[new Date(curr.date).toDateString()] = {
      isActive: curr.availableLand > 0,
      location: curr.location || 'Unknown Location',
      owner: curr.owner || 'Unknown Owner',
      crop: curr.crop || 'Unknown Crop'
    };
    return acc;
  }, {});

  // Create a grid array
  const grid = [];
  for (let i = 0; i < allDays.length; i += columns) {
    grid.push(allDays.slice(i, i + columns));
  }

  // Ensure the grid has the desired number of rows
  while (grid.length < rows) {
    grid.push(new Array(columns).fill(null));
  }

  return grid.map(row =>
    row.map(day => ({
      date: day,
      ...availabilityMap[day] || { isActive: false, location: 'No Data', owner: 'No Data', crop: 'No Data' }
    }))
  );
};

const LandAvailabilityChart = ({ data }) => {
  const grid = generateGrid(data);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '24px' }}>
        Land Availability Chart
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 30px)`, // Smaller cell size
        gridTemplateRows: `repeat(${grid.length}, 30px)`, // Smaller cell size
        gap: '1px', // Smaller gap between cells
        padding: '10px',
        overflow: 'auto',
        border: '2px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}>
        {grid.flat().map(({ isActive, location, owner, crop }, index) => (
          <div
            key={index}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: isActive ? 'green' : 'lightgray',
              border: '1px solid gray',
              borderRadius: '3px', // Smaller border radius
              position: 'relative',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'transparent' // Hide any text or content inside cells
            }}
            title={`Location: ${location}\nOwner: ${owner}\nCrop: ${crop}`} // Tooltip text
          >
            {/* Tooltip content styled directly within cell */}
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              color: 'black',
              padding: '3px', // Smaller padding
              border: '1px solid gray',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
              visibility: 'hidden',
              opacity: 0,
              transition: 'opacity 0.2s'
            }}>
              Location: {location}<br />
              Owner: {owner}<br />
              Crop: {crop}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandAvailabilityChart;
