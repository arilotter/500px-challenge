import React from 'react';
import './style.css';

const PhotoTile = (props) => {
  return (
    <div className='photoTile'>
      <img
        src={props.thumbnailUrl}
        alt={props.title}
      />
    </div>
  );
};

export default PhotoTile;
