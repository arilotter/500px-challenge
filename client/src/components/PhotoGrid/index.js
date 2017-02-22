import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import PhotoTile from '../PhotoTile';
import Spinner from '../Spinner';
import './style.css';

const GUTTER_WIDTH = 16;

export default class PhotoGrid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photos: [],
      photoIDs: [],
      ...this.calculatePhotoWidth()
    };
    // Bind class methods to 'this' so we can refer to the instance in the method
    this.loadMore = this.loadMore.bind(this);
    this.calculatePhotoWidth = this.calculatePhotoWidth.bind(this);

    window.addEventListener('orientationchange', () => {
      this.calculatePhotoWidth();
    });
  }

  calculatePhotoWidth () {
    const photoWidth = Math.min((window.screen.availWidth - GUTTER_WIDTH * 3) / 2, 300); // Scale images based on maximum window size (for mobile)
    const columnBreakpoints = [...Array(25).keys()].map(i => { // Support filling up to 8k monitors :)
      const columns = i + 1;
      const mq = i > 0 ? (columns + 1) * GUTTER_WIDTH + columns * photoWidth + 'px' : undefined; // the smallest breakpoint shouldn't have a specified size
      return { mq, columns, gutter: GUTTER_WIDTH };
    });
    return { photoWidth, columnBreakpoints };
  }

  loadMore (newPage) {
    window.fetch('/api/popular/' + newPage)
      .then(res => res.json())
      .then(({page: loadedPage, photos: loadedPhotos}) => {
        if (loadedPage < newPage) {
          return console.error('Tried to load an already-loaded page.');
        }
        // Eliminate any duplicates
        const photos = [...this.state.photos, ...loadedPhotos.filter(photo => !this.state.photoIDs.includes(photo.id))];
        // Keep track of all new photo IDs
        const photoIDs = photos.map(photo => photo.id);
        this.setState({ photos, photoIDs });
      });
  }

  render () {
    return (
      <MasonryInfiniteScroller
        className='photoGrid'
        pageStart={0}
        loadMore={this.loadMore}
        sizes={this.state.columnBreakpoints}
        loader={<Spinner />}
        hasMore
      >
        {
          this.state.photos.map(photo => {
            const calculatedHeight = Math.round(this.state.photoWidth / photo.thumbWidth * photo.thumbHeight);
            return (<PhotoTile
              key={photo.id}
              title={photo.title}
              author={photo.fullname}
              thumbnailUrl={photo.thumbnailUrl}
              width={this.state.photoWidth}
              height={calculatedHeight}
            />);
          })
        }
      </MasonryInfiniteScroller>
    );
  }
}
