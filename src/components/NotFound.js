import React from 'react';
import './NotFound.css';
import { ArrowUpIcon } from './Icons';

function NotFound() {
  return (
    <div className="sp-notfound-container">
      <div className="sp-notfound-card">
        {/* Terminal Header */}
        <div className="sp-notfound-head">
          <div className="sp-notfound-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <span className="sp-notfound-path">{'// ERROR 404: ROUTE_NOT_FOUND'}</span>
        </div>

        {/* 404 Content */}
        <div className="sp-notfound-body">
          <div className="sp-notfound-code">404</div>
          <h1 className="sp-notfound-title">ENDPOINT UNREACHABLE</h1>
          <p className="sp-notfound-desc">
            The requested path or route does not exist in this system environment.
            Please verify the URL structure or return to base.
          </p>

          <div className="sp-notfound-actions">
            <a href="/" className="sp-notfound-btn">
              <ArrowUpIcon width={16} height={16} style={{ transform: 'rotate(-90deg)' }} />
              Return to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
