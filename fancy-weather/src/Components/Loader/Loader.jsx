import React from 'react';
import loading from './fw_loading.svg';
import './index.scss';

export default function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="animation-wrapper">
        <img src={loading} alt={'Weather is loading...'}/>
      </div>
    </div>
  )
}
