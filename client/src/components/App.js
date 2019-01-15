import React from 'react';
import Header from './Header';
import Social from './Social';

const App = () => {
  return (
    <div>

      <Header />
      <ul className="socials">
        <li><Social target="YouTube"/></li>
      </ul>

    </div>
  );
}

export default App;
