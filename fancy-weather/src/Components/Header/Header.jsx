import React from 'react';
import Controls from '../Controls/Controls';
import Search from '../Search/Search';
import './index.scss';

export default function Header(props) {
  return (
    <div className="header-wrapper">
      <Controls lang={props.lang} />
      <Search />
    </div>
  )
}
