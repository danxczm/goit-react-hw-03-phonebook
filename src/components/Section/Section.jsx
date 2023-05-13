import PropTypes from 'prop-types';
import css from './Section.module.css';
export const Section = ({ title, children }) => {
  return (
    <>
      <h2 className={css.section_text}>{title}</h2>
      {children}
    </>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
