// About.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


function About() {
  return (
    <div className="about-container">
      <div className="rhombus">
        <div className="content">
          <p>Welcome to LeetCode Visualizer.</p>
          <p>LeetCode Visualizer is a web application</p>
          <p>that helps users visualize their </p>
          <p>LeetCode statistics and progress.</p>
        </div>
      </div>
      <div className='footer2'>
        Developed by <a href="https://twitter.com/Shruti_Aug2" style={{ color: '#1aa1d9', textDecoration: 'none' }}>Shruti</a>
      </div>
      <div className='footer3'>
          <a href="https://twitter.com/Shruti_Aug2" style={{ color: '#0c85d0', textDecoration: 'none' }}>
          <FontAwesomeIcon icon={faTwitter} /> Twitter
          </a>
      </div>
    </div>
  );
}

export default About;

