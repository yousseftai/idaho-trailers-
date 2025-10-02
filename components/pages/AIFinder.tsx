import React, { useState, useCallback } from 'react';
import { getAITrailerRecommendations } from '../../services/geminiService';
import { TRAILERS_DATA } from '../../constants';
import { Trailer } from '../../types';
import TrailerCard from '../TrailerCard';
import { SparklesIcon } from '../icons/Icons';

const AIFinder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendedTrailers, setRecommendedTrailers] = useState<Trailer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindTrailers = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecommendedTrailers([]);

    try {
      const recommendedIds = await getAITrailerRecommendations(prompt, TRAILERS_DATA);
      const trailers = TRAILERS_DATA.filter(trailer => recommendedIds.includes(trailer.id));
      setRecommendedTrailers(trailers);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const examplePrompts = [
    "I'm moving a 1-bedroom apartment.",
    "A heavy duty trailer to haul a classic car.",
    "Something to haul away branches and yard debris.",
    "A small, cheap trailer for a dump run."
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <SparklesIcon className="mx-auto h-12 w-12 text-pine-green" />
        <h1 className="mt-4 text-4xl font-serif font-bold text-forest-green">AI Trailer Finder</h1>
        <p className="mt-2 text-lg text-earth">
          Describe what you need to haul, and let our AI find the ideal trailer for you.
        </p>
      </div>

      <div className="mt-8 max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFindTrailers()}
            placeholder="e.g., 'I need to move a refrigerator and a couch'"
            className="flex-grow w-full px-4 py-3 border border-sage-green rounded-md focus:ring-pine-green focus:border-pine-green"
          />
          <button
            onClick={handleFindTrailers}
            disabled={isLoading}
            className="bg-pine-green text-white font-bold py-3 px-6 rounded-md hover:bg-forest-green transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : 'Find Trailers'}
          </button>
        </div>
        <div className="text-sm text-center mt-4 text-gray-500">
          Or try an example:
          <button onClick={() => setPrompt(examplePrompts[Math.floor(Math.random() * examplePrompts.length)])} className="ml-2 text-pine-green font-semibold hover:underline">
            Inspire me!
          </button>
        </div>
      </div>

      <div className="mt-12">
        {error && (
          <div className="text-center text-red-600 bg-red-100 p-4 rounded-md">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {recommendedTrailers.length > 0 && (
          <>
            <h2 className="text-2xl font-serif font-semibold text-center text-forest-green mb-6">Here's what I found for you:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendedTrailers.map((trailer, index) => (
                <TrailerCard key={trailer.id} trailer={trailer} delay={index * 100} />
              ))}
            </div>
          </>
        )}

        {!isLoading && !error && recommendedTrailers.length === 0 && prompt && (
            <div className="text-center py-10">
                <h3 className="text-2xl text-forest-green font-semibold">No recommendations found</h3>
                <p className="text-earth mt-2">We couldn't find a match. Try being more specific about what you're hauling.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AIFinder;
