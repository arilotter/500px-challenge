import React from 'react';
import './style.css';

const PhotoTile = (props) => {
  return <div><img src={props.thumbnailUrl} /></div>;
};

export default PhotoTile;
