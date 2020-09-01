import React from 'react';
import PropTypes from 'prop-types';
import style from './Details.module.scss';
import { kipoiskUrl } from '../../../../helpers/services';
import { moreAboutFilm } from '../../../../assets/text-data';
import Player from '../../Player';
import posters from '../../../../assets/posters';
import audios from '../../../../assets/audios';
import noPoster from '../../../../assets/pictures/no_poster.jpg';

const Details = ({ film, name }) => {
  console.log(film, name);
  const { nameEn, nameRu, year, rating, genres, filmId } = film;
  const link = kipoiskUrl.replace('{filmId}', filmId);
  return (
    <>
      <div className={style.details}>
        <div className={style.poster}>
          <img src={posters[nameEn] || noPoster} alt={nameRu} />
        </div>
        <div className={style.info}>
          <h3 className={style.title}>{nameRu}</h3>
          <p className={style.rating}>{rating}</p>
          <p className={style.year}>{year}</p>
          <p className={style.genres}>{genres.join(', ')}</p>
          <a className={style.kinopoisk} href={link}>
            <span></span>
            {moreAboutFilm.ru}
          </a>
        </div>
      </div>
      <div className={style.track}>
        <Player isPlaying={false} audio={audios[name]} />
      </div>
    </>
  );
};

Details.propTypes = {
  film: PropTypes.object,
  name: PropTypes.string,
};

export default Details;
