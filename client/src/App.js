import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import PhotoGrid from './components/PhotoGrid';
import './App.css';

class App extends Component {
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
    return (
      <div>
        <Toolbar />
        <PhotoGrid photos={this.state.photos} />
      </div>
    );
  }
}

export default App;
