import React from 'react';

import Navbar from './components/layout/navbar';
import Landing from './components/layout/landing';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Navbar />
        <Landing />
      </div>
    );
  }
}

export default App;
