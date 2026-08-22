import React from 'react';
import './Background.css';

/* Site-wide ambient background: aurora ribbon, dot matrix, meteor
   streaks, film grain, and a cursor-following spotlight. Everything is
   fixed, pointer-events: none, and animated via transform/opacity only. */
function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg-horizon" />
      <div className="bg-aurora bg-aurora-a" />
      <div className="bg-aurora bg-aurora-b" />
      <div className="bg-dots" />
      <div className="bg-spotlight" />
      <div className="bg-grain" />
    </div>
  );
}

export default Background;
