import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import PhotoTile from '../PhotoTile';
import Spinner from '../Spinner';
import './style.css';

const GUTTER_WIDTH = 16;
const PHOTO_WIDTH = Math.min((window.screen.width - GUTTER_WIDTH * 3) / 2, 300); // Scale images based on maximum window size (for mobile)

export default class PhotoGrid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photos: []
    };
    this.loadMore = this.loadMore.bind(this); // So we can use 'this' in the method
    // columns
    this.sizes = [...Array(25).keys()].map(i => { // Support filling up to 8k monitors :)
      const columns = i + 1;
      const mq = i > 0 ? (columns + 1) * GUTTER_WIDTH + columns * PHOTO_WIDTH + 'px' : undefined; // the smallest breakpoint shouldn't have a specified size
      return { mq, columns, gutter: GUTTER_WIDTH };
    });
    this.photoIDs = [];
  }

  loadMore (newPage) {
    window.fetch('/api/popular/' + newPage)
      .then(res => res.json())
      .then(({loadedPage, photos}) => {
        if (loadedPage <= newPage) {
          return console.error('Tried to load an already-loaded page.');
        }
        // Eliminate any duplicates
        const newPhotos = photos.filter(photo => !this.photoIDs.includes(photo.id));
        // Keep track of all photo IDs
        this.photoIDs = [...this.photoIDs, ...newPhotos.map(photo => photo.id)];
        this.setState({
          photos: [...this.state.photos, ...newPhotos]
        });
      });
  }

  render () {
    return (
      <MasonryInfiniteScroller
        className='photoGrid'
        pageStart={0}
        loadMore={this.loadMore}
        sizes={this.sizes}
        loader={<Spinner />}
        hasMore
      >
        {
          this.state.photos.map(photo => {
            const calculatedHeight = Math.round(PHOTO_WIDTH / photo.thumbWidth * photo.thumbHeight);
            return (<PhotoTile
              key={photo.id}
              title={photo.title}
              thumbnailUrl={photo.thumbnailUrl}
              width={PHOTO_WIDTH}
              height={calculatedHeight}
            />);
          })
        }
      </MasonryInfiniteScroller>
    );
  }
}
