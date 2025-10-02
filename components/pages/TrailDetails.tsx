

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BookingModal from '../BookingModal';

const TrailDetails: React.FC = () => {
  const { trailId } = useParams<{ trailId: string }>();
  // FIX: Corrected function name from getTrailById to getTrailerById which exists on AppContext.
  const { getTrailerById } = useAppContext();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // FIX: Renamed variable from 'trail' to 'trailer' for clarity and consistency.
  const trailer = getTrailerById(trailId!);

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
          <div className="bg-white/60 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold font-serif text-forest-green mb-4">Trailer Details</h3>
            {/* FIX: Updated details to show trailer-specific information instead of trail properties. */}
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
              onClick={() => setIsBookingModalOpen(true)}
              className="mt-6 w-full bg-pine-green text-white font-bold py-3 px-4 rounded-md hover:bg-forest-green transition-all duration-300 transform hover:scale-105"
            >
              Rent This Trailer
            </button>
          </div>
        </div>
      </div>
      {/* FIX: Corrected prop name from 'trail' to 'trailer' for BookingModal component. */}
      {isBookingModalOpen && <BookingModal trailer={trailer} onClose={() => setIsBookingModalOpen(false)} />}
    </div>
  );
};

export default TrailDetails;
