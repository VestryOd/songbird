import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { search, placeholder } from '../../common/vocabulary';

import './index.scss';

class Search extends Component {
  state ={
    text: '',
  }

  handleReset =() => {
    this.setState({
      text: ''
    })
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
    })
  }

  render() {
    const { text } = this.state;
    const { lang, isLoading } = this.props;
    return (
      <form className="input-ui search-form" id="search-place" onSubmit={this.handleSubmit}>
        <div className="input-wrapper" >
          <label htmlFor="place-search">
            <div className="search-indicator">
              {!isLoading && <span className="icon-ui icon-search"></span>}
              {isLoading && <span className="icon-ui icon-loading"></span>}
            </div>
            <input
              className="search-input"
              type="search"
              value={text}
              id="place-search"
              autoComplete="off"
              placeholder={placeholder[lang]}
              onChange={this.handleInputChange}
              />
          </label>
          <div className="close-indicator">
            <button className="icon-ui icon-reset" type="reset" onClick={this.handleReset}/>
          </div>
        </div>
        <button className="search-send" type="submit">
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
}

Search.defaultProps = {
  lang: 'en',
  isLoading: false,
  onAddressChange: () => { },
}

export default Search;