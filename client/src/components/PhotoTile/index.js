import React, { Component } from 'react';
import classNames from 'classnames';
import './style.css';

import PhotoSourceButton from '../PhotoSourceButton';

export default class PhotoTile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render () {
    return (
      <div
        className={classNames('photoTile', { 'photoTileLoaded': this.state.loaded })} // Run the animation once the tile has loaded
        style={{
          width: this.props.width + 'px',
          height: this.props.height + 'px'
        }}
      >
        <div className='photoTileContents'>
          <img
            src={this.props.thumbnailUrl}
            alt={this.props.title}
            width={this.props.width}
            height={this.props.height}
            onLoad={() => this.setState({ loaded: true })}
          />
          <div className='photoDetailsContainer'>
            <div className='photoTitle'>{this.props.title}</div>
            <div className='photoAuthor'>{this.props.author}</div>
            <PhotoSourceButton photoId={this.props.id} />
          </div>
        </div>
      </div>
    );
  }
}
