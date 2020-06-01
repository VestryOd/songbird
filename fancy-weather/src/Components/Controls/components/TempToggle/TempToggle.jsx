import React from 'react';
import './index.scss';

export default function TempToggle() {
  return (
    <div className="button-toggler">
      <input type="checkbox" className="checkbox" />
      <div className="knobs"><span>°C</span></div>
      <div className="layer"></div>
    </div>
  )
}
