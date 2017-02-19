import React, { Component } from 'react';
import classNames from 'classnames';
import './style.css';

export default class PhotoTile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  render () {
    return (
      <img
        className={classNames('photoTile', { 'photoTileLoaded': this.state.loaded })} // Run the animation once the tile has loaded
        src={this.props.thumbnailUrl}
        alt={this.props.title}
        width={this.props.width}
        height={this.props.height}
        onLoad={() => this.setState({ loaded: true })}
      />
    );
  }
}
