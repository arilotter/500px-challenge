import React, { Component } from 'react';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import PhotoTile from '../PhotoTile';
import Spinner from '../Spinner';
import './style.css';


export default class PhotoGrid extends Component {
  constructor (props) {
    super(props);
    this.state = {
      photos: [],
      page: 0,
      photoWidth: 300
    };
    this.loadMore = this.loadMore.bind(this); // So we can use 'this' in the method
    this.sizes = [
      { columns: 4, gutter: 16 }
    ];
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
        loader={<Spinner />}
        hasMore
      >
        {
          this.state.photos.map(photo => {
            const calculatedHeight = Math.round(this.state.photoWidth / photo.thumbWidth * photo.thumbHeight);
            return (<PhotoTile
              key={photo.id}
              title={photo.title}
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
