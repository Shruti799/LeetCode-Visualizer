// Body.js
import React from 'react';

function Body() {
  return (
    <div className="body">
      <div className="wide-box">
      <div className="search-container">
          <input type="text" className="search-input" placeholder="LeetCode User Handle" />
          <span className="search-icon">🔍</span>
      </div>
      </div>
    </div>
  );
}

export default Body;
