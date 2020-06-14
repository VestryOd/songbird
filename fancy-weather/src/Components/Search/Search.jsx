import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultState } from '../../common/constants';
import { search, placeholder } from '../../common/vocabulary';

import style from './Search.module.scss';

class Search extends Component {
  state ={
    text: '',
  }

  handleReset =() => {
    this.setState({
      text: '',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { onAddressChange } = this.props;
    onAddressChange(text);
  }

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      text: value,
    });
  }

  render() {
    const { text } = this.state;
    const { lang, isLoading } = this.props;
    return (
      <form
        className={classNames(style['input-ui'], style['search-form'])}
        id="search-place"
        onSubmit={this.handleSubmit}
      >
        <div className={style['input-wrapper']}>
          <label htmlFor={style['place-search']}>
            <div className={style['search-indicator']}>
              {!isLoading && (
                <span
                  className={classNames(style['icon-ui'], style['icon-search'])}
                ></span>
              )}
              {isLoading && (
                <span
                  className={classNames(
                    style['icon-ui'],
                    style['icon-loading'],
                  )}
                ></span>
              )}
            </div>
            <input
              className={style['search-input']}
              value={text}
              id="place-search"
              autoComplete="off"
              placeholder={placeholder[lang]}
              onChange={this.handleInputChange}
            />
          </label>
          <div className={style['close-indicator']}>
            <button
              className={classNames(style['icon-ui'], style['icon-reset'])}
              type="reset"
              onClick={this.handleReset}
            />
          </div>
        </div>
        <button className={style['search-send']} type="submit">
          {search[lang]}
        </button>
      </form>
    );
  }
}

Search.propTypes = {
  lang: PropTypes.string,
  isLoading: PropTypes.bool,
  onAddressChange: PropTypes.func.isRequired,
};

Search.defaultProps = {
  lang: defaultState.lang,
  isLoading: defaultState.isLoading,
  onAddressChange: () => { },
};

export default Search;
