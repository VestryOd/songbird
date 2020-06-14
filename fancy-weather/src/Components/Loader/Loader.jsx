import React from 'react';
import { TrinityRingsSpinner } from 'react-epic-spinners';
import style from './Loader.module.scss';

const spinnerOptions = {
  color: '#ffffff',
  size: 150,
};

const Loader = () => (
  <div className={style.loader}>
    <TrinityRingsSpinner color={spinnerOptions.color} size={spinnerOptions.size} />
  </div>
);

export default Loader;
