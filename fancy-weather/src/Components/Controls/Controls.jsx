import React from 'react';
import LanguageSelect from './components/LanguageSelect/LanguageSelect';
import RefreshButton from './components/RefreshButton/RefreshButton';
import TempToggle from './components/TempToggle/TempToggle';

import './index.scss';

const countries = [
  { text: 'EN', value: 'en' },
  { text: 'RU', value: 'ru' },
  { text: 'BY', value: 'by' },
];

export default function Controls(props) {
  return (
    <div className='controls-container'>
      <RefreshButton />
      <LanguageSelect countries={countries} language ={props.lang}/>
      <TempToggle />
    </div>
  );
}
