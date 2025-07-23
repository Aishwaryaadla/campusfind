import React from 'react';

const ItemCard = ({ title, description, image, children }) => {
  return (
    <div className="card h-full bg-white shadow-md border border-base-300 transition duration-300 ease-in-out hover:shadow-xl cursor-pointer flex flex-col">
      <figure className="h-48 w-full bg-base-200 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="object-cover h-48 w-full" />
        ) : (
          <span className="text-sm text-gray-400">No Image Available</span>
        )}
      </figure>

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

export default ItemCard;
