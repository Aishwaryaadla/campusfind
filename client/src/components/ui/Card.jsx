import React from 'react';

const Card = ({ className = '', children }) => {
  return (
    <div className={`card h-full bg-white shadow-md border border-base-300 transition duration-300 ease-in-out hover:shadow-xl cursor-pointer flex flex-col ${className}`}>
      <div className="card-body flex flex-col justify-between flex-grow">
        {children}
      </div>
    </div>
  );
};

export default Card;
