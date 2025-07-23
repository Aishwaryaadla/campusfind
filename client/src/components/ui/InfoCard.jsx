
import React from "react";

const InfoCard = ({ title, description, children }) => {
  return (
    <div className="bg-white sticky rounded-xl shadow-md p-6 border border-base-300 transition duration-300 ease-in-out hover:shadow-xl flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-base text-base-content text-opacity-70 mb-4">
          {description}
        </p>
      </div>
      {children && <div className="mt-auto">{children}</div>}
    </div>
  );
};

export default InfoCard;
