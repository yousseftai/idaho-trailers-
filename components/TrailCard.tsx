
import React from 'react';
import { Link } from 'react-router-dom';
// FIX: Changed Trail to Trailer as the Trail type does not exist.
import { Trailer } from '../types';

// FIX: This component has been updated to display Trailer data.
const TrailCard: React.FC<{ trail: Trailer; delay?: number }> = ({ trail, delay = 0 }) => {
  return (
    <Link 
      to={`/trailers/${trail.id}`}
      className="group block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out will-change-transform animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      <div className="relative">
        <img src={trail.imageUrl} alt={trail.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute top-2 left-2 bg-forest-green text-white text-xs font-bold px-2 py-1 rounded-full">
            {trail.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-serif font-semibold text-forest-green truncate">{trail.name}</h3>
        <p className="text-sm text-earth mb-2">{trail.location}</p>
        <p className="text-sm text-gray-600 line-clamp-2 h-10">{trail.description}</p>
        <div className="mt-3 flex justify-between items-center text-sm">
            <div>
                <span className="font-bold text-lg text-pine-green">${trail.dailyRate}</span>
                <span className="text-gray-600">/day</span>
            </div>
            <div className="text-right">
                <p className="font-medium">{trail.size}</p>
                <p className="text-gray-500">{trail.capacity} lbs capacity</p>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default TrailCard;
