import React from 'react'

const Tile = ({ icon, heading, subheading, amount, note }) => {
  return (
    <div className="flex justify-between items-center bg-white border rounded shadow-sm px-4 py-3">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="bg-gray-800 text-white p-2 rounded">
          {icon}
        </div>

        {/* Text */}
        <div>
          <div className="font-semibold">{heading}</div>
          <div className="text-sm text-gray-500">{subheading}</div>
        </div>
      </div>

      {/* Right Side */}
      <div className="text-right">
        <div className="font-semibold text-gray-800">{amount}</div>
        <div className="text-sm text-gray-500">{note}</div>
      </div>
    </div>
  );
};

export default Tile;
