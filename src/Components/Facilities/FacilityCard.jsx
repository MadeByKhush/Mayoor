import React from "react";

const FacilityCard = ({ image, title, desc }) => {
  return (
    <div className="bg-card-light rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2">
      <img
        alt={title}
        className="scale-105 md:scale-100 w-full h-56 object-cover"
        src={image}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-text-light-secondary">{desc}</p>
      </div>
    </div>
  );
};

export default FacilityCard;
