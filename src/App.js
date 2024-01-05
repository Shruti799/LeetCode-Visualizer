import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="header">
      <p>LeetCode  Visualizer</p>
        <div className="home-icon">
          <a href='App.js'>
            <FontAwesomeIcon icon={faHome} />
            <span>HOME</span>
          </a>
       </div>
       <div className='about-icon'>
          <a href='App.js'>
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>ABOUT</span>
          </a>
      </div>
   </header>
  );
}

export default Header;





  





