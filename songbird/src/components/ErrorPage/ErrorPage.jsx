import React from 'react';
import { errorPage } from '../../assets/text-data';
import './ErrorPage.scss';
import img from './page-error.webp';

const ErrorPage = () => (
  <div className="error-wrapper">
    <div className="error-page">
      <img src={img} alt="Error" />
      <h1 className="error-title">{errorPage.ru.title}</h1>
      <a href="/">{errorPage.ru.btnHome}</a>
    </div>
  </div>
);

export default ErrorPage;
