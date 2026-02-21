import React from "react";

const EventCard = ({ image, title, desc }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden group">
      <img
        alt={title}
        loading="lazy"
        decoding="async"
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        src={image}
      />
      <div className="p-6">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm mt-2 opacity-80">{desc}</p>
      </div>
    </div>
  );
};

export default EventCard;
