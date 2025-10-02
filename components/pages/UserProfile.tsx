import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const UserProfile: React.FC = () => {
  const { user, rentals, getTrailerById } = useAppContext();

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please log in to see your profile.</h2>
      </div>
    );
  }

  const upcomingRentals = rentals.filter(r => new Date(r.startDate) >= new Date(new Date().toDateString()));
  const pastRentals = rentals.filter(r => new Date(r.startDate) < new Date(new Date().toDateString()));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">Welcome back, {user.name}!</h1>
      <p className="text-earth mb-8">Here are your trailer rentals.</p>

      <div>
        <h2 className="text-2xl font-serif font-semibold text-pine-green border-b-2 border-sage-green pb-2 mb-4">Upcoming Rentals</h2>
        {upcomingRentals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRentals.map(rental => {
              const trailer = getTrailerById(rental.trailerId);
              if (!trailer) return null;
              return (
                <div key={rental.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-forest-green">{trailer.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{trailer.location}</p>
                  <p className="text-earth"><strong>Start Date:</strong> {new Date(rental.startDate).toLocaleDateString()}</p>
                  <p className="text-earth"><strong>Duration:</strong> {rental.rentalDays} {rental.rentalDays > 1 ? 'days' : 'day'}</p>
                  <Link to={`/trailers/${trailer.id}`} className="text-pine-green hover:underline mt-4 inline-block">View Trailer Details</Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-earth">You have no upcoming rentals. <Link to="/trailers" className="text-pine-green font-semibold hover:underline">Time to plan a project!</Link></p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-serif font-semibold text-pine-green border-b-2 border-sage-green pb-2 mb-4">Past Rentals</h2>
        {pastRentals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastRentals.map(rental => {
              const trailer = getTrailerById(rental.trailerId);
              if (!trailer) return null;
              return (
                <div key={rental.id} className="bg-white rounded-lg shadow-md p-6 opacity-70">
                  <h3 className="text-xl font-bold text-forest-green">{trailer.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{trailer.location}</p>
                  <p className="text-earth"><strong>Date:</strong> {new Date(rental.startDate).toLocaleDateString()}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-earth">No past rentals recorded yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
