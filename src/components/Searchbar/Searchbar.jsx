import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChangeInput = e => {
    setQuery(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    onSubmit(query);
    setQuery('');
  };
  return (
    <header className={css.header}>
      <form onSubmit={onSubmitForm} className={css.form}>
        <input
          className={css.header__input}
          type="text"
          autoComplete="off"
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeInput}
        />
        <button className={css.header__button} type="submit">
          FIND
        </button>
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
