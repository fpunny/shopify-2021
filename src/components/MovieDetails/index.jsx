import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import noImageFound from '../../assets/no-image.jpg';
import fetchOMDb from '../../utils/fetchOMDb';
import Loading from '../Loading';
import Text from '../Text';
import styles from './MovieDetails.module.scss';

export default function MovieDetails({ movieId, actions }) {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();
    setLoading(true);
    (async () => {
      try {
        const result = await fetchOMDb({ i: movieId }, controller);
        if (!controller.signal.aborted) {
          setMovie(result);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn(err);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [movieId]);

  return loading ? (
    <Loading size='large' />
  ) : (
    <div className={styles.container}>
      <div>
        <img
          className={styles.poster}
          onError={({ target }) => {
            target.src = noImageFound;
          }}
          src={movie.Poster}
          alt={movie.Title}
        />
        {actions}
      </div>
      <div className={styles.content}>
        <Text type='heading1' tag='h2'>
          {movie.Title} ({movie.Year})
        </Text>
        <ul className={styles.stats}>
          {[
            {
              tag: `Metascore: `,
              text:
                movie.Metascore + (movie.Metascore === `N/A` ? `` : ` / 100`),
            },
            {
              tag: `IMDB Rating: `,
              text:
                movie.imdbRating +
                (movie.imdbRating === `N/A` ? `` : ` / 10.0`),
            },
            {
              tag: `Runtime: `,
              text: movie.Runtime,
            },
          ].map(({ tag, text }, key) => (
            <Text className={styles.stat} type='meta1' key={key} tag='li'>
              <Text color='text' type='meta1' tag='span' weight='bold'>
                {tag}
              </Text>
              {text}
            </Text>
          ))}
        </ul>
        <Text className={styles.heading} type='heading3' tag='h3'>
          Movie Plot
        </Text>
        <Text>{movie.Plot}</Text>
        <Text className={styles.heading} type='heading3' tag='h3'>
          The Cast & Crew
        </Text>
        <ul className={styles.team}>
          {[
            {
              tag: `Writer: `,
              text: movie.Writer,
            },
            {
              tag: `Director: `,
              text: movie.Director,
            },
            {
              tag: `Actors: `,
              text: movie.Actors,
            },
          ].map(({ tag, text }, key) => (
            <Text
              className={styles[`team-item`]}
              color='text-alt'
              key={key}
              tag='li'
            >
              <Text color='text' tag='span' weight='bold'>
                {tag}
              </Text>
              {text}
            </Text>
          ))}
        </ul>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  movieId: PropTypes.string,
  actions: PropTypes.node,
};
