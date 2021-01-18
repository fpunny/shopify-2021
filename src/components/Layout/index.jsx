import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import styles from './Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        {children}
      </main>
      <Footer/>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
