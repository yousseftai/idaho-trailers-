import React from 'react';
import { Link } from 'react-router-dom';
import { Trailer } from '../types';

const TrailerCard: React.FC<{ trailer: Trailer; delay?: number }> = ({ trailer, delay = 0 }) => {
  return (
    <Link 
      to={`/trailers/${trailer.id}`}
      className="group block bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out will-change-transform animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'backwards' }}
    >
      <div className="relative">
        <img src={trailer.imageUrl} alt={trailer.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute top-2 left-2 bg-forest-green text-white text-xs font-bold px-2 py-1 rounded-full">
            {trailer.type}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-serif font-semibold text-forest-green truncate">{trailer.name}</h3>
        <p className="text-sm text-earth mb-2">{trailer.location}</p>
        <p className="text-sm text-gray-600 line-clamp-2 h-10">{trailer.description}</p>
        <div className="mt-3 flex justify-between items-center text-sm">
            <div>
                <span className="font-bold text-lg text-pine-green">${trailer.dailyRate}</span>
                <span className="text-gray-600">/day</span>
            </div>
            <div className="text-right">
                <p className="font-medium">{trailer.size}</p>
                <p className="text-gray-500">{trailer.capacity} lbs capacity</p>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default TrailerCard;
