import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Trailer } from '../types';
import { XIcon } from './icons/Icons';

interface RentalModalProps {
  trailer: Trailer;
  onClose: () => void;
}

const RentalModal: React.FC<RentalModalProps> = ({ trailer, onClose }) => {
  const { addRental, user } = useAppContext();
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [rentalDays, setRentalDays] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      addRental(trailer.id, startDate, rentalDays);
      setStep(3);
    }
  };

  if (!user) {
    return null; 
  }
  
  const totalCost = trailer.dailyRate * rentalDays;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center animate-fade-in" onClick={onClose}>
      <div className="bg-cream rounded-lg shadow-2xl p-8 w-full max-w-md m-4 relative transform transition-transform duration-300 scale-95 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-earth hover:text-pine-green transition-colors">
          <XIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-serif font-bold text-forest-green mb-2">Rent This Trailer</h2>
        <p className="text-earth mb-6">{trailer.name}</p>

        <div className="overflow-hidden">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="animate-fade-in">
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-forest-green mb-1">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-sage-green rounded-md focus:ring-pine-green focus:border-pine-green"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="rentalDays" className="block text-sm font-medium text-forest-green mb-1">Number of Days</label>
                <input
                  type="number"
                  id="rentalDays"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(parseInt(e.target.value, 10))}
                  min="1"
                  max="30"
                  required
                  className="w-full px-3 py-2 border border-sage-green rounded-md focus:ring-pine-green focus:border-pine-green"
                />
              </div>
              <button type="submit" className="w-full bg-pine-green text-white font-bold py-2 px-4 rounded-md hover:bg-forest-green transition-colors duration-300">
                Continue
              </button>
            </form>
          )}

          {step === 2 && (
             <div className="animate-fade-in">
                <h3 className="text-lg font-semibold text-forest-green mb-4">Confirm Your Rental</h3>
                <div className="space-y-3 text-earth bg-white/50 p-4 rounded-md">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Start Date:</strong> {new Date(startDate).toLocaleDateString()}</p>
                  <p><strong>Rental Duration:</strong> {rentalDays} {rentalDays > 1 ? 'days' : 'day'}</p>
                  <hr className="my-2 border-sage-green" />
                  <p className="flex justify-between items-center">
                    <strong className="text-lg">Total Cost:</strong> 
                    <span className="font-bold text-xl text-forest-green">${totalCost.toFixed(2)}</span>
                  </p>
                </div>
                <div className="mt-6 flex gap-4">
                  <button onClick={() => setStep(1)} className="w-full bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors">
                    Back
                  </button>
                  <button onClick={handleSubmit} className="w-full bg-pine-green text-white font-bold py-2 px-4 rounded-md hover:bg-forest-green transition-colors">
                    Confirm Rental
                  </button>
                </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fade-in">
              <h3 className="text-2xl font-bold text-forest-green mb-4">Rental Confirmed!</h3>
              <p className="text-earth mb-6">Your rental of the {trailer.name} is confirmed. A receipt has been sent to your email.</p>
              <button onClick={onClose} className="w-full bg-pine-green text-white font-bold py-2 px-4 rounded-md hover:bg-forest-green transition-colors">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalModal;
