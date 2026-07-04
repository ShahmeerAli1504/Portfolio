import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-wrapper" role="status" aria-label="Loading portfolio">
      <div className="loader-mark">
        <span>S</span>
        <span>A</span>
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}

export default Loader;
