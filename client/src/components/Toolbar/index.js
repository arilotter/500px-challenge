import React from 'react';
import './style.css';
import logo from './logo.svg';

const Toolbar = () => {
  return <div className='toolbar'><img className='logo' src={logo} alt='500px' /> Popular Photos</div>;
};

export default Toolbar;
