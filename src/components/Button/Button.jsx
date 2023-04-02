import css from './Button.module.css';
const Button = ({ loadMore }) => {
  return (
    <button type="submit" className={css.button__more} onClick={loadMore}>
      <span>Load more</span>
    </button>
  );
};
export default Button;
