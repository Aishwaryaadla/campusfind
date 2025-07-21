
import React from 'react';

const Card = ({ title, description, image, children }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300 max-w-sm transition duration-300 ease-in-out hover:shadow-xl cursor-pointer">
      {image && (
        <figure>
          <img src={image} alt={title} className="object-cover h-48 w-full" />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        {children && <div className="card-actions justify-end">{children}</div>}
      </div>
    </div>
  );
};

export default Card;
