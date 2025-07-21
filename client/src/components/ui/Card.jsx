
import React from 'react';

const Card = ({ title, description, image, children }) => {
  return (
    <div className="card h-full bg-base-100 shadow-md border border-base-300 transition duration-300 ease-in-out hover:shadow-xl cursor-pointer flex flex-col">
      {image && (
        <figure>
          <img src={image} alt={title} className="object-cover h-48 w-full" />
        </figure>
      )}
      <div className="card-body flex flex-col justify-between flex-grow">
        <div>
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
        </div>
        {children && (
          <div className="card-actions justify-end mt-4">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Card;

