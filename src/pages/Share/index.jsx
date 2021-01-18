import { Redirect, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MoviesList from '../../components/MoviesList';
import Loading from '../../components/Loading';
import Section from '../../components/Section';
import fetchOMDb from '../../utils/fetchOMDb';
import Text from '../../components/Text';
import styles from './Share.module.scss';

export default function Share() {
  const params = useParams();
  const [session, setSession] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    (async () => {
      try {
        const userSession = JSON.parse(atob(params.payload));
        userSession.nominations = await Promise.all(
          userSession.nominations.map((nomination) =>
            fetchOMDb({ i: nomination }, controller),
          ),
        );
        if (!controller.signal.aborted) {
          setSession(userSession);
        }
      } catch (err) {
        if (err.name !== `AbortError`) {
          setSession(null);
          if (process.env.NODE_ENV !== 'production') {
            console.error(err);
          }
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [params.payload]);

  if (session === null) {
    return <Redirect to='/' />;
  }

  return (
    <Section>
      {loading ? (
        <Loading size='large' />
      ) : (
        <>
          <Text type='heading1' tag='h2' className={styles.heading}>
            {session.name || `Someone's`} Nominations
          </Text>
          <MoviesList
            movies={{
              Search: session.nominations,
            }}
            readOnly
          />
        </>
      )}
    </Section>
  );
}
