import { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa';
import getShareableLink from '../../../../utils/getShareLink';
import fetchOMDb from '../../../../utils/fetchOMDb';
import MoviesList from '../../../../components/MoviesList';
import Loading from '../../../../components/Loading';
import Button from '../../../../components/Button';
import Popup from '../../../../components/Popup';
import Input from '../../../../components/Input';
import Text from '../../../../components/Text';
import styles from './MyNominations.module.scss';

export default function MyNominations({ userSession }) {
  const [showPopup, setShowPopup] = useState(false);
  const [nominations, setNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(``);

  useEffect(() => {
    if (copied) {
      const timeout = window.setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [copied]);

  useEffect(() => {
    if (showPopup) {
      const controller = new AbortController();
      setLoading(true);
      (async () => {
        try {
          const results = await Promise.all(
            userSession.nominations.map((nomination) =>
              fetchOMDb({ i: nomination }, controller),
            ),
          );
          if (!controller.signal.aborted) {
            setNominations(results);
          }
        } catch (err) {
          if (err.name !== `AbortError`) {
            throw err;
          }
        } finally {
          setLoading(false);
        }
      })();
      return () => {
        controller.abort();
      };
    }
  }, [showPopup, userSession.nominations]);

  return (
    <>
      <Button
        type='outline'
        onClick={() => setShowPopup(true)}
        className={styles.button}
      >
        My nominations ({userSession.nominations.length})
      </Button>
      <Popup
        className={styles.popup}
        onBackground={() => setShowPopup(false)}
        show={showPopup}
      >
        {loading ? (
          <Loading size='large' />
        ) : (
          <>
            <Text type='heading1' tag='h2' className={styles.heading}>
              My Nominations
            </Text>
            <MoviesList
              movies={{
                Search: nominations,
              }}
            />
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const shareable = getShareableLink(
                  userSession.nominations,
                  name,
                );
                navigator.clipboard.writeText(shareable);
                setCopied(true);
                return false;
              }}
            >
              <Text className={styles[`form-heading`]} type='heading2' tag='h2'>
                Share your nominations
              </Text>
              <div className={styles.field}>
                <Input
                  onChange={({ target }) => setName(target.value)}
                  value={name}
                  label='Your name (optional)'
                  placeholder='John Doe'
                  name='name'
                />
                <Button
                  leftIcon={FaLink}
                  disabled={copied}
                  className={styles.button}
                  type='outline'
                >
                  {copied ? `Copied to clipboard` : `Get shareable link`}
                </Button>
              </div>
            </form>
            <Button onClick={() => setShowPopup(false)}>Back to list</Button>
          </>
        )}
      </Popup>
    </>
  );
}
