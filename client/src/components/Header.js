import React from 'react';
import StrapiAuth from './auth/StrapiAuth';

function Header(props) {

  return(
    <div>
      <h1>DUBZOO</h1>
      <StrapiAuth />
    </div>
  );
}

export default Header;
