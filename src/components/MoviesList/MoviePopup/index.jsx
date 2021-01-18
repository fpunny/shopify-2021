import { useState, useEffect, useContext } from 'react';
import { FaGavel, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import MovieDetails from '../../MovieDetails';
import Button from '../../Button';
import Popup from '../../Popup';
import styles from './MoviePopup.module.scss';
import { SessionContext } from '../../SessionProvider';

export default function MoviePopup({ movieId, onClose = () => {}, readOnly }) {
  const { addNomination, removeNomination, userSession } = useContext(
    SessionContext,
  );
  const [show, setShow] = useState(!!movieId);
  useEffect(() => {
    setShow(!!movieId);
  }, [movieId]);

  const close = (event) => {
    setShow(false);
    onClose(event);
  };

  return (
    <Popup onBackground={close} className={styles.popup} show={show}>
      <MovieDetails
        movieId={movieId}
        actions={
          <>
            {userSession.nominations.includes(movieId) ? (
              <Button
                onClick={() => removeNomination(movieId)}
                className={styles.button}
                leftIcon={FaTimes}
                type='outline'
              >
                Remove nomination
              </Button>
            ) : (
              readOnly || (
                <Button
                  disabled={userSession.nominations.length === 5}
                  onClick={() => addNomination(movieId)}
                  className={styles.button}
                  leftIcon={FaGavel}
                  type='outline'
                >
                  Nominate Movie
                </Button>
              )
            )}
            <Button className={styles.button} onClick={close} type='ghost'>
              Back to list
            </Button>
          </>
        }
      />
    </Popup>
  );
}

MoviePopup.propTypes = {
  movieId: PropTypes.string,
  onClose: PropTypes.func,
  readOnly: PropTypes.bool,
};
