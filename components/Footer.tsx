import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-forest-green text-cream mt-12">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Idaho Trailer Rental. All rights reserved.</p>
        <p className="text-sm text-sage-green mt-1">Your trusted partner for all hauling needs in the Gem State.</p>
      </div>
    </footer>
  );
};

export default Footer;
