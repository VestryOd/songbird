import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './GameHeader.module.scss';
import { noCategories } from '../../../assets/text-data';

const GameHeader = ({ categories, groupCount }) => {
  const isNoEmpty = !categories || categories.length === 0;
  const output = isNoEmpty ? (
    <div className="item">{noCategories.ru}</div>
  ) : (
    categories.map((item, idx) => (
      <div key={`header-item-${idx}`} className={classNames(style.item, idx === groupCount ? style.active : null)}>
        {item.title}
      </div>
    ))
  );
  return <header className={style.header}>{output}</header>;
};

GameHeader.propTypes = {
  categories: PropTypes.array,
  groupCount: PropTypes.number,
};

export default GameHeader;
