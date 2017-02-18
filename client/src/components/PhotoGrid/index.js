import React from 'react';
import './style.css';

import PhotoTile from '../PhotoTile';


const PhotoGrid = ({ photos }) => {
  const photoTiles = photos.map(photo => (
    <PhotoTile
      title={photo.title}
      key={photo.id}
    />
  ));
  return (
    <div>{photoTiles}</div>
  );
};

export default PhotoGrid;
