import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import PhotoGrid from './components/PhotoGrid';
import './App.css';

const dummyPhotos = [
  { title: 'wow nice pic' },
  { title: 'a second picture' },
  { title: 'here\'s another one' }
];

class App extends Component {
  render () {
    return (
      <div>
        <Toolbar />
        <PhotoGrid photos={dummyPhotos} />
      </div>
    );
  }
}

export default App;
