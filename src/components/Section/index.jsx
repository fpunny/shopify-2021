import PropTypes from 'prop-types';
import styles from './Section.module.scss';

export default function Section({ children }) {
  return (
    <section className={styles.container}>
      { children }
    </section>
  );
};

Section.propTypes = {
  children: PropTypes.node,
};
