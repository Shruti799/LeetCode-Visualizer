import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <p>LeetCode  Visualizer</p>
        <div className="home-icon">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} />
          <span>HOME</span>
        </Link>
       </div>
       <div className='about-icon'>
       <Link to="/about"> 
          <FontAwesomeIcon icon={faInfoCircle} />
          <span>ABOUT</span>
       </Link>
      </div>
   </header>
  );
}

export default Header;





  





