import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getRandomName } from '../../helpers/services';
import { welcomePage } from '../../assets/text-data';
import style from './WelcomePage.module.scss';
import image from './old_movies.png';

const GenderChoice = ({ genders }) => (
  <div className={style['gender-items']}>
    {genders.map((el, idx) => (
      <div key={idx}>
        <input
          className={style.gender}
          type="radio"
          id={`gender-${el.value}`}
          name="gender"
          value={el.label}
          defaultChecked={el.value === 'person'}
        />
        <label className={style.label} htmlFor={`gender-${el.value}`}>
          {el.label}
        </label>
      </div>
    ))}
  </div>
);

const WelcomePage = ({ onUserDataChange }) => {
  const { ru } = welcomePage;
  const [name, setName] = useState(getRandomName());

  const handleInputChange = ({ target: { value } }) => {
    setName(value);
  };

  const selectInput = ({ target }) => {
    target.setSelectionRange(0, target.value.length);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUserDataChange(event.target);
  };

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{ru.title}</h1>
      <img className={style.picture} src={image} alt={ru.imageAlt} />
      <p className={style.description}>{ru.description}</p>
      <p className={style.label}>{ru.label}</p>
      <form className={style.user} id="user" onSubmit={handleSubmit}>
        <div className={style['form-item']}>
          <fieldset>
            <legend>{ru.genderLabel}</legend>
            <GenderChoice genders={ru.gender} />
          </fieldset>
        </div>
        <div className={style['form-item']}>
          <fieldset>
            <legend>{ru.nameLabel}</legend>
            <input
              className={style.input}
              autoComplete="off"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              onFocus={selectInput}
              onClick={selectInput}
            />
          </fieldset>
          <button className={style.button} type="submit">
            {ru.button}
          </button>
        </div>
      </form>
      {/* <p className={style.details}>{ru.details}</p> */}
    </div>
  );
};

WelcomePage.propTypes = {
  onUserDataChange: PropTypes.func.isRequired,
};

GenderChoice.propTypes = {
  genders: PropTypes.array.isRequired,
};

export default WelcomePage;
