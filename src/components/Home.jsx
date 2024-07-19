import React from 'react';

import { Customcard } from './styling/Customcard';
import './styling/home.css';

export const Home = ({ searchTerm }) => { // Accept searchTerm as a prop
  return (
    <div className='home-container'>
      {/* <div className='sidebar-container'>
        <Sidebar />
      </div> */}
      <div className='card-container'>
        <Customcard searchTerm={searchTerm} /> {/* Pass searchTerm to Customcard */}
      </div>
    </div>
  );
};





