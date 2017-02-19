import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';

import './style.css';
import PhotoTile from '../PhotoTile';


export default class PhotoGrid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photos: [],
      page: 0
    };
    this.loadMore = this.loadMore.bind(this); // So we can use 'this' in the method
    this.sizes = [
      { columns: 3, gutter: 16 }
    ];
  }

  componentWillMount () {
    this.loadMore();
  }

  loadMore () {
    window.fetch('/api/popular/' + (this.state.page + 1))
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
    return (
      <MasonryInfiniteScroller
        className='photoGrid'
        pageStart={1}
        loadMore={this.loadMore}
        sizes={this.sizes}
        hasMore
      >
        {
          this.state.photos.map(photo => (
            <PhotoTile
              title={photo.title}
              thumbnailUrl={photo.thumbnailUrl}
              key={photo.id}
            />
          ))
        }
      </MasonryInfiniteScroller>
    );
  }
}
