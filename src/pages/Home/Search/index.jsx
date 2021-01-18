import { useState, useEffect, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { SessionContext } from '../../../components/SessionProvider';
import MyNominations from './MyNominations';
import MoviesList from '../../../components/MoviesList';
import Section from '../../../components/Section';
import Loading from '../../../components/Loading';
import fetchOMDb from '../../../utils/fetchOMDb';
import Input from '../../../components/Input';
import Text from '../../../components/Text';
import styles from './Search.module.scss';

export default function Search() {
  const { userSession } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState();
  const [query, setQuery] = useState(``);
  const [error, setError] = useState();

  useEffect(() => {
    setError(undefined);
    if (query === ``) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const result = await fetchOMDb(
          {
            type: `movie`,
            s: query,
          },
          controller,
        );
        if (!controller.signal.aborted) {
          setMovies(result);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <Section>
      {userSession.nominations.length === 5 && (
        <div className={styles.banner}>
          <Text type='body1' weight='bold' color='primary' tag='p'>
            You have 5 nominations, click on the button, "My nominations", to
            review your list.
          </Text>
        </div>
      )}
      <div className={styles.header}>
        <Input
          className={styles.input}
          onChange={({ target }) => setQuery(target.value)}
          label='Search by movie title'
          placeholder='eg. The Room'
          loading={loading}
          icon={FaSearch}
          value={query}
          name='search'
          type='text'
          status={
            error ?? {
              type: `error`,
              text: error,
            }
          }
        />
        <MyNominations userSession={userSession} />
      </div>
      {query === `` || error ? (
        <Text
          className={styles.message}
          color='text-alt'
          type='heading3'
          weight='bold'
          tag='p'
        >
          {error ?? `Use the search above to find your movie`}
        </Text>
      ) : loading ? (
        <Loading className={styles.loading} size='large' />
      ) : (
        <MoviesList
          movies={movies}
          fetchNextPage={async (page) => {
            try {
              const result = await fetchOMDb({
                type: `movie`,
                s: query,
                page,
              });
              return result.Search;
            } catch (err) {
              if (err.name !== 'AbortError') {
                setError(err.message);
              }
            }
          }}
        />
      )}
    </Section>
  );
}
