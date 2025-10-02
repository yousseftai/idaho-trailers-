import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import Trailers from './components/pages/Trailers';
import TrailerDetails from './components/pages/TrailerDetails';
import UserProfile from './components/pages/UserProfile';
import AIFinder from './components/pages/AIFinder';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <div className="bg-cream text-earth font-sans flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trailers" element={<Trailers />} />
              <Route path="/trailers/:trailerId" element={<TrailerDetails />} />
              <Route path="/ai-finder" element={<AIFinder />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
