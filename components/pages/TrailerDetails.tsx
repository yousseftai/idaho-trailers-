import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import RentalModal from '../RentalModal';

const TrailerDetails: React.FC = () => {
  const { trailerId } = useParams<{ trailerId: string }>();
  const { getTrailerById } = useAppContext();
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  const trailer = getTrailerById(trailerId!);

  if (!trailer) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Trailer not found</h2>
        <Link to="/trailers" className="text-pine-green hover:underline mt-4 inline-block">Back to all trailers</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="h-[50vh] bg-cover bg-center" style={{ backgroundImage: `url(${trailer.imageUrl})` }}>
        <div className="h-full w-full bg-black bg-opacity-40 flex flex-col justify-end p-8 md:p-12">
            <div className="container mx-auto">
                <h1 className="text-white text-4xl md:text-6xl font-serif font-bold">{trailer.name}</h1>
                <p className="text-sage-green text-lg">{trailer.location}</p>
            </div>
        </div>
      </div>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold font-serif text-forest-green mb-4">Trailer Description</h2>
            <p className="text-earth leading-relaxed">{trailer.longDescription}</p>
          </div>
          <div className="bg-white/60 p-6 rounded-lg shadow-md self-start">
            <h3 className="text-xl font-bold font-serif text-forest-green mb-4">Specifications</h3>
            <ul className="space-y-3 text-earth">
              <li className="flex justify-between"><strong>Type:</strong> <span className="font-semibold text-pine-green">{trailer.type}</span></li>
              <li className="flex justify-between"><strong>Size:</strong> <span>{trailer.size}</span></li>
              <li className="flex justify-between"><strong>Capacity:</strong> <span>{trailer.capacity.toLocaleString()} lbs</span></li>
              <li className="flex justify-between items-center">
                <strong>Daily Rate:</strong> 
                <span className="font-bold text-2xl text-forest-green">${trailer.dailyRate}</span>
              </li>
            </ul>
            <button
              onClick={() => setIsRentalModalOpen(true)}
              className="mt-6 w-full bg-pine-green text-white font-bold py-3 px-4 rounded-md hover:bg-forest-green transition-all duration-300 transform hover:scale-105"
            >
              Rent This Trailer
            </button>
          </div>
        </div>
      </div>
      {isRentalModalOpen && <RentalModal trailer={trailer} onClose={() => setIsRentalModalOpen(false)} />}
    </div>
  );
};

export default TrailerDetails;
