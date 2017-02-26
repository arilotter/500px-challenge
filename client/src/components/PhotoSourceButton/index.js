import React from 'react';
import open from './open.svg';
import './style.css';

export default function PhotoSourceButton ({photoId}) {
  return (
    <div
      className='photoSourceButton'
      onClick={() => window.open(`https://500px.com/photo/${photoId}`, '_blank')}
    >
      <img
        className='photoSourceButtonIcon'
        src={open}
        alt='open on 500px'
      />
      <div>open on 500px</div>
    </div>
  );
}
