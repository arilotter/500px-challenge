import React from 'react';
import './style.css';

const PhotoTile = (props) => {
  return (
    <img
      className='photoTile'
      src={props.thumbnailUrl}
      alt={props.title}
      width={props.width}
      height={props.height}
    />
  );
};

export default PhotoTile;
