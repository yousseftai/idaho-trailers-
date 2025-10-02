import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, Rental, Trailer } from '../types';
import { MOCK_USER, TRAILERS_DATA } from '../constants';

interface AppContextType {
  user: User | null;
  rentals: Rental[];
  addRental: (trailerId: string, startDate: string, rentalDays: number) => void;
  getTrailerById: (trailerId: string) => Trailer | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user] = useState<User | null>(MOCK_USER);
  const [rentals, setRentals] = useState<Rental[]>([]);

  const addRental = useCallback((trailerId: string, startDate: string, rentalDays: number) => {
    if (!user) {
      alert('You must be logged in to rent a trailer.');
      return;
    }
    const newRental: Rental = {
      id: `r${Date.now()}`,
      trailerId,
      userId: user.id,
      startDate,
      rentalDays,
    };
    setRentals(prevRentals => [...prevRentals, newRental]);
  }, [user]);

  const getTrailerById = useCallback((trailerId: string): Trailer | undefined => {
    return TRAILERS_DATA.find(trailer => trailer.id === trailerId);
  }, []);

  return (
    <AppContext.Provider value={{ user, rentals, addRental, getTrailerById }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
