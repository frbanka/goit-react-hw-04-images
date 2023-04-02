import css from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ loadMore }) => {
  return (
    <button type="submit" className={css.button__more} onClick={loadMore}>
      <span>Load more</span>
    </button>
  );
};
Button.prototype = {
  loadMore: PropTypes.func.isRequired,
};
export default Button;
