import React from 'react';

import './index.scss';

export default function Search() {
  return (
    <form className="search-form input-ui" id="search-place">
      <div className="input-wrapper" >
        <input className="search-input" type="search" name="place-search" placeholder={'Search a place'} />
        <div className="search-indicator">
          <span className="icon-ui icon-search show"></span>
          <span className="icon-ui icon-loading"></span>
        </div>
      </div>
      <input className="search-send" type="submit" value="search" />
      <div className="info-wrapper">
        <p className="info-massage">{'No results found'}</p>
      </div>
    </form>
  );
}
