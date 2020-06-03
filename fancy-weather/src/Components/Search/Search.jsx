import React from 'react';
import { search, placeholder, noResults } from '../../common/vocabulary';

import './index.scss';

export default function Search() {
  const lang = localStorage.getItem('fancyWeatherLang');
  return (
    <form className="search-form input-ui" id="search-place">
      <div className="input-wrapper" >
        <input className="search-input" type="search" name="place-search" placeholder={placeholder[lang]} />
        <div className="search-indicator">
          <span className="icon-ui icon-search show"></span>
          <span className="icon-ui icon-loading"></span>
        </div>
      </div>
      <input className="search-send" type="submit" value={search[lang]} />
      <div className="info-wrapper">
        <p className="info-massage">{noResults[lang]}</p>
      </div>
    </form>
  );
}
