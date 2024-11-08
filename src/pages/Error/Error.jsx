import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <p className="text-2xl mt-4">Oops! Internal server issues.</p>
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 text-xl text-white bg-red-600 rounded-md hover:bg-red-700 transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
