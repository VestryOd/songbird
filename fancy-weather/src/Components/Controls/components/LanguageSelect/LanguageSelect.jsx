import React from 'react';

import './index.scss';

export default function LanguageSelect(props) {
  const { countries } = props;
  const { language } = props;
  console.log(props);
  return (
    <select className="controls-ui language-select" id="language" defaultValue={language}>
      {countries.map(el => (<option key={el.value} value={el.value} >{el.text}</option>))}
    </select>
  );
};

