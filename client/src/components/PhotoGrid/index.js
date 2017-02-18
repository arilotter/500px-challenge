import React, { Component } from 'react';

import './style.css';
import PhotoTile from '../PhotoTile';


export default class PhotoGrid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photos: [],
      page: 0
    };
    this.loadPage = this.loadPage.bind(this); // So we can use 'this' in the method
  }
  componentWillMount () {
    this.loadPage();
  }

  loadPage () {
    window.fetch('/api/popular/' + this.state.page)
      .then(res => res.json())
      .then(({page, photos}) => {
        if (page <= this.state.page) {
          return console.error('Tried to load an already-loaded page.');
        }
        this.setState({
          photos: [...this.state.photos, ...photos],
          page: page
        });
      });
  }

  render () {
    const photoTiles = this.state.photos.map(photo => (
      <PhotoTile
        title={photo.title}
        thumbnailUrl={photo.thumbnailUrl}
        key={photo.id}
      />
    ));
    return (
      <div className='photoGrid'>{photoTiles}</div>
    );
  }
}
