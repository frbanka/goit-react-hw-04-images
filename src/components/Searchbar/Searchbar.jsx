import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    query: '',
  };

  onChangeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { query } = this.state;

    onSubmit(query);
  };
  render() {
    const { query } = this.state;
    return (
      <header className={css.header}>
        <form onSubmit={this.onSubmitForm} className={css.form}>
          <input
            className={css.header__input}
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            value={query}
            onChange={this.onChangeInput}
          />
          <button className={css.header__button} type="submit">FIND</button>
        </form>
      </header>
    );
  }
}
export default Searchbar;
