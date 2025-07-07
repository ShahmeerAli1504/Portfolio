import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p className="loading-text">Loading Portfolio...</p>
    </div>
  );
}

export default Loader;
