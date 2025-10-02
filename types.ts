export enum TrailerType {
  Utility = 'Utility',
  Enclosed = 'Enclosed Cargo',
  CarHauler = 'Car Hauler',
  Dump = 'Dump Trailer',
  Gooseneck = 'Gooseneck',
}

export interface Trailer {
  id: string;
  name: string;
  location: string;
  description: string;
  longDescription: string;
  type: TrailerType;
  capacity: number; // in lbs
  size: string; // e.g., '6x12 ft'
  dailyRate: number; // in USD
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Rental {
  id: string;
  trailerId: string;
  userId: string;
  startDate: string; // YYY-MM-DD
  rentalDays: number;
}
