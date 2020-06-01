import React from 'react';
import Controls from '../Controls/Controls';
import Search from '../Search/Search';
import './index.scss';

export default function Header() {
  return (
    <div className="header-wrapper">
      <Controls />
      <Search />
    </div>
  )
}
