import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Navigation/>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
