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
      location: curr.location || 'Unknown Location'
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
      ...availabilityMap[day] || { isActive: false, location: 'No Data' }
    }))
  );
};

const LandAvailabilityChart = ({ data }) => {
  const grid = generateGrid(data);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontSize: '28px' }}>
        Land Availability Chart
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid[0].length}, 20px)`,
        gridTemplateRows: `repeat(${grid.length}, 20px)`,
        gap: '2px',
        padding: '10px',
        overflow: 'auto',
        border: '2px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}>
        {grid.flat().map(({ date, isActive, location }, index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: isActive ? 'green' : 'lightgray',
              border: '1px solid gray',
              textAlign: 'center',
              lineHeight: '20px',
              color: 'black',
              borderRadius: '3px',
              position: 'relative',
            }}
            title={location || 'No Location'}
          />
        ))}
      </div>
    </div>
  );
};

export default LandAvailabilityChart;
