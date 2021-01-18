import { createContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

// We don't need an object, but we can expand with this
const initSession = () => ({
  nominations: [],
});

export const SessionContext = createContext({
  userSession: initSession(),
  removeNomination: () => {},
  addNomination: () => {},
});

export default function SessionProvider({ children }) {
  const [userSession, setUserSession] = useState(() => {
    const lastSession = localStorage.getItem(`user-session`);
    if (!lastSession) return initSession();
    try {
      return JSON.parse(lastSession);
    } catch (err) {
      return initSession();
    }
  });

  // Autosaving
  useEffect(() => {
    localStorage.setItem(`user-session`, JSON.stringify(userSession));
  }, [userSession]);

  // Updating session
  const addNomination = useCallback((nomination) => {
    setUserSession((_userSession) => ({
      ..._userSession,
      nominations: [..._userSession.nominations, nomination],
    }));
  }, []);

  const removeNomination = useCallback((nomination) => {
    setUserSession((_userSession) => {
      const index = _userSession.nominations.findIndex(
        (id) => nomination === id,
      );
      if (index === -1) return _userSession;

      const newNominations = [..._userSession.nominations];
      newNominations.splice(index, 1);
      return {
        ..._userSession,
        nominations: newNominations,
      };
    });
  }, []);

  return (
    <SessionContext.Provider
      value={{
        removeNomination,
        addNomination,
        userSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

SessionProvider.propTypes = {
  children: PropTypes.node,
};
