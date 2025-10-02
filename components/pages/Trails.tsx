

import React, { useState, useMemo } from 'react';
// FIX: Correctly import TRAILERS_DATA instead of non-existent TRAILS_DATA.
import { TRAILERS_DATA } from '../../constants';
// FIX: Import Trailer and TrailerType instead of non-existent Trail, TrailDifficulty, and TrailActivity.
import { Trailer, TrailerType } from '../../types';
import TrailCard from '../TrailCard';
import { SearchIcon } from '../icons/Icons';

const Trails: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // FIX: Renamed state from difficultyFilter to typeFilter to match trailer properties and removed activityFilter.
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // FIX: Updated filtering logic to use trailer properties (type) instead of trail properties.
  const filteredTrailers = useMemo(() => {
    return TRAILERS_DATA.filter(trailer => {
      const matchesSearch = trailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            trailer.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All' || trailer.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [searchTerm, typeFilter]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-md mb-8 animate-fade-in">
        <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">Find Your Trailer</h1>
        <p className="text-earth mb-6">Filter through our inventory to find the perfect trailer for your needs.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-sage-green rounded-md focus:ring-pine-green focus:border-pine-green"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-4 py-2 border border-sage-green rounded-md focus:ring-pine-green focus:border-pine-green bg-white"
          >
            <option value="All">All Trailer Types</option>
            {/* FIX: Use TrailerType enum to populate filter options, resolving multiple type errors. */}
            {Object.values(TrailerType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button
            onClick={() => { setSearchTerm(''); setTypeFilter('All'); }}
            className="w-full bg-earth text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredTrailers.length > 0 ? (
          filteredTrailers.map((trailer, index) => (
            <TrailCard key={trailer.id} trail={trailer} delay={index * 100} />
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <h3 className="text-2xl text-forest-green font-semibold">No Trailers Found</h3>
            <p className="text-earth mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trails;
