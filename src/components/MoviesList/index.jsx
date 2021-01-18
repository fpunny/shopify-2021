import { useState, useEffect, useContext } from 'react';
import { FaCaretDown, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import noImageFound from '../../assets/no-image.jpg';
import { SessionContext } from '../SessionProvider';
import MoviePopup from './MoviePopup';
import Button from '../Button';
import Text from '../Text';
import styles from './MoviesList.module.scss';

export default function MoviesList({ movies = {}, readOnly, fetchNextPage }) {
  const { userSession } = useContext(SessionContext);
  const [currentPage, setCurrentPage] = useState({});
  const [loading, setLoading] = useState(false);
  const [movieId, setMovieId] = useState();
  const maxPage = Math.ceil(movies?.totalResults / 10);

  useEffect(() => {
    if (movies) {
      setCurrentPage({
        items: [...(movies.Search || [])],
        page: 1,
      });
    }
  }, [movies]);

  return (
    <>
      <ul className={styles.container}>
        {currentPage.items?.map(({ Poster, Title, Year, imdbID }) => (
          <li className={styles.item} key={imdbID}>
            <button
              onClick={() => setMovieId(imdbID)}
              className={styles.button}
            >
              {userSession.nominations.includes(imdbID) && (
                <FaStar className={styles.star} />
              )}
              <div className={styles.overlay}>
                <Text
                  color='background'
                  align='center'
                  weight='bold'
                  type='body1'
                >
                  {Title}
                </Text>
                <Text
                  color='background'
                  align='center'
                  weight='bold'
                  type='meta1'
                >
                  ({Year})
                </Text>
              </div>
              <img
                onError={({ target }) => {
                  target.src = noImageFound;
                }}
                className={styles.poster}
                src={Poster}
                alt={Title}
              />
            </button>
          </li>
        ))}
      </ul>
      {movies.totalResults &&
        (currentPage.page !== maxPage ? (
          <Button
            rightIcon={FaCaretDown}
            leftIcon={FaCaretDown}
            onClick={async () => {
              setLoading(true);
              const nextPage = currentPage.page + 1;
              const result = await fetchNextPage(nextPage);
              if (!result) return;
              setCurrentPage({
                items: [...currentPage.items, ...result],
                page: nextPage,
              });
              setLoading(false);
            }}
            className={styles.more}
            loading={loading}
            color='primary'
          >
            Load more
          </Button>
        ) : (
          <Text align='center' weight='bold' tag='p' color='text-alt'>
            You have reached the end.
          </Text>
        ))}
      <MoviePopup
        onClose={() => setMovieId(null)}
        movieId={movieId}
        readOnly={readOnly}
      />
    </>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.shape({
    Search: PropTypes.arrayOf(PropTypes.object),
    totalResults: PropTypes.number,
  }),
  readOnly: PropTypes.bool,
  fetchNextPage: PropTypes.func,
};
