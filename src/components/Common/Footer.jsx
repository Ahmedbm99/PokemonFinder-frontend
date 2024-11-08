import React from 'react';

const Footer = () => {
  return (
    <footer className=" p-4  text-gray-400 mt-6"  style={{ backgroundColor: '#003049' }}>
         
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Pokémon Finder. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="https://github.com/Ahmedbm99" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
