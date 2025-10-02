import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <img 
            src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2020/10/bdc22a2216505e157bb11f0f5826068b.jpeg" 
            alt="Trailer on an open road in Idaho" 
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Rent the Right Trailer for Any Job
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            Reliable trailers for hauling, moving, and more across the Gem State.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <Link to="/trailers" className="bg-pine-green text-white font-bold py-3 px-8 rounded-md hover:bg-forest-green transition-all duration-300 transform hover:scale-105">
              Browse All Trailers
            </Link>
            <Link to="/ai-finder" className="bg-cream text-forest-green font-bold py-3 px-8 rounded-md hover:bg-sage-green transition-all duration-300 transform hover:scale-105">
              Use AI Trailer Finder
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif text-forest-green mb-12">Why Rent With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h3 className="text-2xl font-semibold text-pine-green mb-2">Wide Selection</h3>
              <p className="text-earth">From small utility trailers to heavy-duty car haulers, we have the right equipment for your project, big or small.</p>
            </div>
            <div className="p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-2xl font-semibold text-pine-green mb-2">AI-Powered Finder</h3>
              <p className="text-earth">Just tell our AI what you need to haul—"a couch and a fridge"—and get instant, personalized trailer recommendations.</p>
            </div>
            <div className="p-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h3 className="text-2xl font-semibold text-pine-green mb-2">Simple Rentals</h3>
              <p className="text-earth">Reserve your trailer online in minutes with our straightforward rental process. Get your job done without the hassle.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;